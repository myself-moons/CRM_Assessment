"""
models.py

Contains all Pydantic models used by the API.
Validation is handled by Pydantic, so we don't need to worry about it.
I love Python libraries. They make work faster lmfao
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class CreateTicket(BaseModel):
    customerName: str = Field(..., 
                              min_length=2, 
                              max_length=100)
    
    customerEmail: EmailStr

    subject: str = Field(..., 
                         min_length=5, 
                         max_length=100)
    
    description: str = Field(..., 
                             min_length=10, 
                             max_length=1000)


class UpdateTicket(BaseModel):
    customerName: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100
    )

    customerEmail: Optional[EmailStr] = None

    subject: Optional[str] = Field(
        None,
        min_length=5,
        max_length=100
    )

    description: Optional[str] = Field(
        None,
        min_length=10,
        max_length=1000
    )

    status: Optional[str] = Field(
        None,
        pattern="^(Open|In Progress|Closed)$"
    )

    noteText: Optional[str] = Field(
        None,
        min_length=1,
        max_length=1000
    )

class Note(BaseModel):
    noteText: str = Field(..., 
                          min_length=1, 
                          max_length=1000)
    
# In future, add DeleteTicket model if needed. 
# For now, we will not implement it as we don't need a delete operation in our API.