"""
Safia:
Pydantic Schemas: Create schemas.py and define Pydantic models for API data validation
(e.g., UserCreate, UserLogin, OpportunityCreate, ProfileBase, ProfileCreate, etc.)
for all models (User, Profile, Opportunity, Application, Subscription).

This file defines the Pydantic models (schemas) for the application.
These schemas are used by FastAPI for data validation, serialization, and documentation.
They define the shape of the data for API requests and responses, and are separate
from the SQLAlchemy database models.
"""
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# A base schema for a User, containing common attributes.
# Other schemas inherit from this to avoid repetition.
class UserBase(BaseModel):
    email: str
    full_name: Optional[str] = None
    role: str

# A schema used specifically for creating a new user.
# It inherits the email from UserBase and adds a password.
class UserCreate(UserBase):
    password: str

# A schema used for reading/returning user data from the API.
# It includes attributes that are safe to expose publicly (no password).
class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        # This allows the Pydantic model to read data from ORM models (like SQLAlchemy).
        orm_mode = True

# Schema for the response when a user successfully logs in.
class Token(BaseModel):
    access_token: str
    token_type: str

# Schema for the data encoded within a JWT access token.
class TokenData(BaseModel):
    email: str | None = None

# Safia: Create Pydantic schemas for Profile model:
# ProfileBase: avatar_url: Optional[str], bio: Optional[str], skills: Optional[List[str]],
#              interests: Optional[List[str]], company_name: Optional[str], company_website: Optional[str]
# ProfileCreate: Inherits from ProfileBase, user_id: int
# Profile: Inherits from ProfileBase, id: int, user_id: int

# Safia: Create Pydantic schemas for Opportunity model:
# OpportunityBase: title: str, description: str, type: Optional[str], tags: Optional[List[str]], status: Optional[str]
# OpportunityCreate: Inherits from OpportunityBase, provider_id: int
# Opportunity: Inherits from OpportunityBase, id: int, provider_id: int, created_at: datetime, updated_at: datetime

# Safia: Create Pydantic schemas for Application model:
# ApplicationBase: status: Optional[str], cover_letter: Optional[str]
# ApplicationCreate: Inherits from ApplicationBase, seeker_id: int, opportunity_id: int
# Application: Inherits from ApplicationBase, id: int, seeker_id: int, opportunity_id: int, submitted_at: datetime

# Safia: Create Pydantic schemas for Subscription model:
# SubscriptionBase: plan_name: str, status: str, start_date: Optional[datetime], end_date: Optional[datetime]
# SubscriptionCreate: Inherits from SubscriptionBase, user_id: int
# Subscription: Inherits from SubscriptionBase, id: int, user_id: int
