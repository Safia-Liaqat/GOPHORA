"""
Safia:
SQLAlchemy Models: Write Python code for all database models (User, Profile, Opportunity, Application, Subscription)
in models.py based on the provided SQL schema.

Database Creation: Use SQLAlchemy's engine to create all tables in your local PostgreSQL database.

This file defines the database models for the application using SQLAlchemy's ORM.
Each class in this file corresponds to a table in the database.
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY
from .database import Base

# Represents the 'users' table in the database.
# SQLAlchemy's ORM maps this class to the table, and its attributes to the columns.
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False) # Renamed from hashed_password to match schema
    full_name = Column(String)
    role = Column(String, nullable=False) # CHECK (role IN ('seeker', 'provider'))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    # Relationships:
    # profile = relationship("Profile", back_populates="user", uselist=False)
    # opportunities = relationship("Opportunity", back_populates="provider")
    # applications = relationship("Application", back_populates="seeker")
    # subscription = relationship("Subscription", back_populates="user", uselist=False)

# Safia: Create the Profile model with the following columns:
# id: Integer, primary_key=True, index=True
# user_id: Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False
# avatar_url: Text
# bio: Text
# skills: ARRAY(Text)
# interests: ARRAY(Text)
# company_name: String
# company_website: Text
# user: relationship("User", back_populates="profile")

# Safia: Create the Opportunity model with the following columns:
# id: Integer, primary_key=True, index=True
# provider_id: Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
# title: String, nullable=False
# description: Text, nullable=False
# type: String
# tags: ARRAY(Text)
# status: String, default="open" # CHECK (status IN ('open', 'closed', 'completed'))
# created_at: DateTime(timezone=True), server_default=func.now()
# updated_at: DateTime(timezone=True), onupdate=func.now(), server_default=func.now()
# provider: relationship("User", back_populates="opportunities")
# applications = relationship("Application", back_populates="opportunity")

# Safia: Create the Application model with the following columns:
# id: Integer, primary_key=True, index=True
# seeker_id: Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
# opportunity_id: Integer, ForeignKey("opportunities.id", ondelete="CASCADE"), nullable=False
# status: String, default="pending" # CHECK (status IN ('pending', 'accepted', 'rejected'))
# cover_letter: Text
# submitted_at: DateTime(timezone=True), server_default=func.now()
# seeker: relationship("User", back_populates="applications")
# opportunity: relationship("Opportunity", back_populates="applications")

# Safia: Create the Subscription model with the following columns:
# id: Integer, primary_key=True, index=True
# user_id: Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False
# plan_name: String, nullable=False # CHECK (plan_name IN ('Explorer', 'Navigator', 'Commander'))
# status: String, nullable=False # CHECK (status IN ('active', 'canceled', 'past_due'))
# start_date: DateTime(timezone=True)
# end_date: DateTime(timezone=True)
# user: relationship("User", back_populates="subscription")
