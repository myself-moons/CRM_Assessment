"""
routes.py

Contains all API endpoints.
"""

from fastapi import APIRouter

from models import CreateTicket,  UpdateTicket
from services import (
    get_all_tickets,
    create_ticket,
    get_ticket_by_id,
    update_ticket       
)
router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.get("/")
def read_tickets():
    return get_all_tickets()


@router.post("/")
def add_ticket(ticket: CreateTicket):
    return create_ticket(ticket.model_dump())

@router.get("/{ticket_id}")
def read_ticket(ticket_id: str):
    ticket = get_ticket_by_id(ticket_id)

    if ticket is None:
        return {
            "success": False,
            "message": "Ticket not found"
        }

    return {
        "success": True,
        "ticket": ticket
    }

@router.put("/{ticket_id}")
def edit_ticket(ticket_id: str, ticket: UpdateTicket):
    updates = ticket.model_dump(exclude_unset=True)

    # Bug Fix: Timing issue where if no fields are provided, 
    # the update_ticket function would still be called and 
    # return a success response.
    # We need to check if updates is empty and return an error response if it is.
    if not updates:
        return {
            "success": False,
            "message": "No fields were provided to update."
        }

    updated_ticket = update_ticket(ticket_id, updates)

    if updated_ticket is None:
        return {
            "success": False,
            "message": "Ticket not found",
        }

    return {
        "success": True,
        "ticket": updated_ticket,
    }