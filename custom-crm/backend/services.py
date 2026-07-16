"""
services.py

Handles all Firebase database operations. Read, Write, Modification.
It would be better to have a separate file for each operation.
For now, we will keep it simple and have all operations in one file.
"""

from datetime import datetime, timezone
from firebase_admin import db

import firebase  # Triggers Firebase Admin SDK initialization.
                 # We have handled multiple initializations so this is fine.


def generate_ticket_id():
    """
    Generate the next human-readable Ticket ID.

    Example:
        Ticket-01
        Ticket-02
        ...
        Ticket-99
        Ticket-100
    """
    tickets = db.reference("tickets").get()

    if not tickets:
        return "Ticket-01"

    highest = 0

    # Firebase generates the database keys, so we iterate through
    # the ticket objects and read their public Ticket IDs.
    for ticket in tickets.values():
        try:
            number = int(ticket["ticketId"].replace("Ticket-", ""))
            highest = max(highest, number)
        except (KeyError, ValueError):
            continue

    return f"Ticket-{highest + 1:02d}"


# Find a ticket using its public Ticket ID (e.g. Ticket-01)
# Returns both the Firebase key and the ticket data.
def find_ticket(ticket_id: str):
    tickets = db.reference("tickets").get()

    if not tickets:
        return None, None

    # Case-insensitive comparison.
    # Ticket-01 == ticket-01 == TICKET-01
    for firebase_key, ticket in tickets.items():
        if ticket.get("ticketId", "").lower() == ticket_id.lower():
            return firebase_key, ticket

    return None, None


# Fetch all tickets.
def get_all_tickets():
    tickets = db.reference("tickets").get()

    return tickets if tickets else {}


# Create a new ticket.
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

        # Every ticket starts without notes.
        "notes": [],

        "createdAt": current_time,
        "updatedAt": current_time,
    }

    # Store the ticket using a Firebase-generated unique key.
    # The human-readable Ticket ID is stored inside the ticket.
    db.reference("tickets").push(ticket)

    return ticket


# Fetch a single ticket by its Ticket ID.
def get_ticket_by_id(ticket_id: str):
    _, ticket = find_ticket(ticket_id)
    return ticket


# Ticket Modification.
# Update one or more fields of a ticket.
def update_ticket(ticket_id: str, updates: dict):

    # Find the ticket using its public Ticket ID.
    firebase_key, ticket = find_ticket(ticket_id)

    # Ticket doesn't exist.
    if ticket is None:
        return None

    # Bug Fix:
    # If no fields are provided, don't update the timestamp.
    # Return the existing ticket unchanged.
    if not updates:
        return ticket

    ticket_ref = db.reference(f"tickets/{firebase_key}")

    # Use a single timestamp throughout this update operation.
    current_time = datetime.now(timezone.utc).isoformat()

    # If a note was provided, append it to the ticket's notes.
    note_text = updates.pop("noteText", None)

    if note_text:
        note_text = note_text.strip()

        if note_text:
            note = {
                "noteText": note_text,
                "createdAt": current_time,
            }

            notes = ticket.get("notes", [])
            notes.append(note)

            updates["notes"] = notes

    # Bug Fix:
    # After processing the request, there may no longer be any fields
    # left to update (for example, if noteText contained only whitespace).
    # In that case, don't modify updatedAt.
    if not updates:
        return ticket

    # Always update the modification timestamp when changes are made.
    updates["updatedAt"] = current_time

    # Update only the fields that were provided.
    ticket_ref.update(updates)

    # Return the updated ticket.
    return ticket_ref.get()