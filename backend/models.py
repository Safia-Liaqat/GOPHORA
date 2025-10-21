"""
This file defines the database models for the application using SQLAlchemy's ORM.
Each class in this file corresponds to a table in the database.
"""
from sqlalchemy import Column, Integer, String
from .database import Base

# Represents the 'users' table in the database.
# SQLAlchemy's ORM maps this class to the table, and its attributes to the columns.
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
