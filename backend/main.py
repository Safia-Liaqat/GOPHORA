from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional

from . import auth, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/auth/register", response_model=schemas.User)
def register_user(user_data: schemas.RegisterRequest, db: Session = Depends(get_db)):
    db_user = auth.get_user(db, email=user_data.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user_data.password)
    db_user = models.User(
        email=user_data.email,
        password_hash=hashed_password,
        full_name=user_data.full_name,
        role=user_data.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Create a profile for the user with the registration data
    profile_data = {
        "user_id": db_user.id,
        "country": user_data.country,
        "city": user_data.city,
    }
    if user_data.role == "seeker" and user_data.skills:
        profile_data["skills"] = [s.strip() for s in user_data.skills.split(',')]
    
    if user_data.role == "provider":
        profile_data["company_name"] = user_data.organizationName
        profile_data["company_website"] = user_data.website

    db_profile = models.Profile(**profile_data)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_user

@app.post("/api/auth/login", response_model=schemas.Token)
def login_for_access_token(form_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = auth.get_user(db, email=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if user.role != form_data.role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"You are not authorized to log in as a {form_data.role}",
        )
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.get("/api/profiles/me", response_model=schemas.Profile)
def read_user_profile(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@app.put("/api/profiles/me", response_model=schemas.Profile)
def update_user_profile(
    profile_update: schemas.ProfileBase,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()

    if not profile:
        profile = models.Profile(user_id=current_user.id, **profile_update.dict(exclude_unset=True))
        db.add(profile)
    else:
        update_data = profile_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile

@app.get("/api/applications/me", response_model=List[schemas.ApplicationWithOpportunity])
def read_seeker_applications(
    current_user: models.User = Depends(auth.get_current_active_seeker),
    db: Session = Depends(get_db),
):
    applications = db.query(models.Application).filter(models.Application.seeker_id == current_user.id).options(joinedload(models.Application.opportunity)).all()
    return applications

@app.post("/api/opportunities", response_model=schemas.Opportunity)
def create_opportunity(
    opportunity: schemas.OpportunityBase,
    current_user: models.User = Depends(auth.get_current_active_provider),
    db: Session = Depends(get_db),
):
    opportunity_data = opportunity.dict(exclude_unset=True)
    location = opportunity_data.get("location")

    if not location:
        profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
        if profile and profile.city and profile.country:
            location = f"{profile.city}, {profile.country}"

    if "tags" in opportunity_data and isinstance(opportunity_data["tags"], str):
        if opportunity_data["tags"]:
            opportunity_data["tags"] = [tag.strip() for tag in opportunity_data["tags"].split(",")]
        else:
            opportunity_data["tags"] = []

    db_opportunity = models.Opportunity(
        **opportunity.dict(),
        provider_id=current_user.id
    )
    db.add(db_opportunity)
    db.commit()
    db.refresh(db_opportunity)
    return db_opportunity

@app.post("/api/applications/apply", response_model=schemas.Application)
def apply_for_opportunity(
    opportunity_id: int,
    cover_letter: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_active_seeker),
    db: Session = Depends(get_db),
):
    # Check if the opportunity exists
    opportunity = db.query(models.Opportunity).filter(models.Opportunity.id == opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    # Check if the seeker has already applied to this opportunity
    existing_application = db.query(models.Application).filter(
        models.Application.seeker_id == current_user.id,
        models.Application.opportunity_id == opportunity_id
    ).first()
    if existing_application:
        raise HTTPException(status_code=400, detail="Already applied to this opportunity")

    # Create the new application
    db_application = models.Application(
        seeker_id=current_user.id,
        opportunity_id=opportunity_id,
        cover_letter=cover_letter
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

@app.get("/api/opportunities/me", response_model=List[schemas.Opportunity])
def read_provider_opportunities(
    current_user: models.User = Depends(auth.get_current_active_provider),
    db: Session = Depends(get_db),
):
    opportunities = db.query(models.Opportunity).filter(models.Opportunity.provider_id == current_user.id).all()
    return opportunities

@app.get("/api/opportunities", response_model=List[schemas.Opportunity])
def read_opportunities(db: Session = Depends(get_db)):
    opportunities = db.query(models.Opportunity).all()
    return opportunities

@app.get("/api/opportunities/{opportunity_id}", response_model=schemas.Opportunity)
def read_opportunity(opportunity_id: int, db: Session = Depends(get_db)):
    db_opportunity = db.query(models.Opportunity).filter(models.Opportunity.id == opportunity_id).first()
    if db_opportunity is None:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return db_opportunity

@app.put("/api/opportunities/{opportunity_id}", response_model=schemas.Opportunity)
def update_opportunity(
    opportunity_id: int,
    opportunity_update: schemas.OpportunityBase,
    current_user: models.User = Depends(auth.get_current_active_provider),
    db: Session = Depends(get_db),
):
    db_opportunity = db.query(models.Opportunity).filter(models.Opportunity.id == opportunity_id).first()
    if db_opportunity is None:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    if db_opportunity.provider_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this opportunity")

    update_data = opportunity_update.dict(exclude_unset=True)
    if "tags" in update_data and isinstance(update_data["tags"], str):
        if update_data["tags"]:
            update_data["tags"] = [tag.strip() for tag in update_data["tags"].split(",")]
        else:
            update_data["tags"] = []

    for key, value in update_data.items():
        setattr(db_opportunity, key, value)

    db.commit()
    db.refresh(db_opportunity)
    return db_opportunity

@app.delete("/api/opportunities/{opportunity_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_opportunity(
    opportunity_id: int,
    current_user: models.User = Depends(auth.get_current_active_provider),
    db: Session = Depends(get_db),
):
    db_opportunity = db.query(models.Opportunity).filter(models.Opportunity.id == opportunity_id).first()
    if db_opportunity is None:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    if db_opportunity.provider_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this opportunity")
    
    db.delete(db_opportunity)
    db.commit()
    return

@app.get("/api/opportunities/{opportunity_id}/applications", response_model=List[schemas.Application])
def get_applications_for_opportunity(
    opportunity_id: int,
    current_user: models.User = Depends(auth.get_current_active_provider),
    db: Session = Depends(get_db),
):
    # Check if the opportunity exists and belongs to the current provider
    opportunity = db.query(models.Opportunity).filter(
        models.Opportunity.id == opportunity_id,
        models.Opportunity.provider_id == current_user.id
    ).first()

    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found or not owned by current provider")

    applications = db.query(models.Application).filter(
        models.Application.opportunity_id == opportunity_id
    ).all()
    return applications