"""
routes.py

Contains all API endpoints.
"""

from fastapi import APIRouter

from models import CreateTicket
from services import (
    get_all_tickets,
    create_ticket,
)

router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.get("/")
def read_tickets():
    return get_all_tickets()


@router.post("/")
def add_ticket(ticket: CreateTicket):
    return create_ticket(ticket.model_dump())