"""
services.py

Handles all Firebase database operations.
"""

from datetime import datetime, timezone
from firebase_admin import db

import firebase  # noqa: F401  # triggers Firebase Admin SDK initialization


def generate_ticket_id():
    """
    Generate the next ticket ID.
    Example:
        TKT-001
        TKT-002
    """

    tickets = db.reference("tickets").get()

    if not tickets:
        return "TKT-001"

    highest = 0

    for ticket in tickets.values():

        # Ignore invalid/empty records
        if not isinstance(ticket, dict):
            continue

        ticket_id = ticket.get("ticketId")

        if not ticket_id:
            continue

        try:
            number = int(ticket_id.replace("TKT-", ""))
            highest = max(highest, number)
        except ValueError:
            continue

    return f"TKT-{highest + 1:03d}"


def get_all_tickets():
    tickets = db.reference("tickets").get()

    return tickets if tickets else {}


def create_ticket(ticket_data: dict):

    ticket_id = generate_ticket_id()

    current_time = datetime.now(timezone.utc).isoformat()

    ticket = {
        "ticketId": ticket_id,
        "customerName": ticket_data["customerName"],
        "customerEmail": ticket_data["customerEmail"],
        "subject": ticket_data["subject"],
        "description": ticket_data["description"],
        "status": "Open",
        "createdAt": current_time,
        "updatedAt": current_time,
    }

    # Push creates a new Firebase-generated key
    tickets_ref = db.reference("tickets")
    new_ticket = tickets_ref.push(ticket)

    return ticket