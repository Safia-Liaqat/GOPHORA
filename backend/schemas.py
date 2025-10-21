"""
This file defines the Pydantic models (schemas) for the application.
These schemas are used by FastAPI for data validation, serialization, and documentation.
They define the shape of the data for API requests and responses, and are separate
from the SQLAlchemy database models.
"""
from pydantic import BaseModel

# A base schema for a User, containing common attributes.
# Other schemas inherit from this to avoid repetition.
class UserBase(BaseModel):
    email: str

# A schema used specifically for creating a new user.
# It inherits the email from UserBase and adds a password.
class UserCreate(UserBase):
    password: str

# A schema used for reading/returning user data from the API.
# It includes attributes that are safe to expose publicly (no password).
class User(UserBase):
    id: int

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
