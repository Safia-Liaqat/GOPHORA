
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from . import models, schemas
from .database import SessionLocal
from .config import SECRET_KEY, ALGORITHM

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    print(f"--- get_current_user called with token: {token[:10]}...") # Print start of token
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str = payload.get("role") # Make sure role is in the token payload
        print(f"--- Token payload decoded: email={email}, role={role}") # Print decoded payload
        if email is None or role is None:
             print("--- ERROR: Email or role missing from token payload")
             raise credentials_exception
    except JWTError as e:
        print(f"--- ERROR: JWT decoding failed: {e}") # Print JWT errors
        raise credentials_exception from e

    user = get_user(db, email=email)
    if user is None:
        print(f"--- ERROR: User '{email}' not found in database") # Print DB lookup failure
        raise credentials_exception

    print(f"--- User found: {user.email}, Role: {user.role}") # Confirm user found
    return user

# --- Add prints inside get_current_active_seeker (if it exists or has extra logic) ---
# This might just call get_current_user and check the role
async def get_current_active_seeker(current_user: models.User = Depends(get_current_user)):
    print(f"--- get_current_active_seeker checking user: {current_user.email}, Role: {current_user.role}")
    if current_user.role != "seeker":
        print(f"--- ERROR: User is not a seeker (Role: {current_user.role})")
        raise HTTPException(status_code=403, detail="Not authorized: Requires seeker role")
    print("--- Seeker role confirmed")
    return current_user

def get_current_active_provider(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "provider":
        raise HTTPException(status_code=403, detail="Not a provider")
    return current_user
