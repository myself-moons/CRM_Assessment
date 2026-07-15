"""
models.py

Contains all Pydantic models used by the API.
"""

from pydantic import BaseModel, EmailStr, Field


class CreateTicket(BaseModel):
    customerName: str = Field(..., min_length=2, max_length=100)
    customerEmail: EmailStr
    subject: str = Field(..., min_length=5, max_length=100)
    description: str = Field(..., min_length=10, max_length=1000)


class UpdateTicket(BaseModel):
    status: str = Field(..., pattern="^(Open|In Progress|Closed)$")