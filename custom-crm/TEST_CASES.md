# Custom CRM - Manual Test Cases

> This document contains all manual test cases for the CRM.
> Every feature should pass these tests before moving to the next phase. This is the bare minimum for the CRM.

---

# Legend

✅ = Expected to Pass

❌ = Expected to Reject / Show Error

---

# Phase 1 - Project Setup

## Backend Starts

### TC-001

Description:
Start the FastAPI backend.

Steps:
1. Activate virtual environment.
2. Start FastAPI server.

Expected Result:
✅ Server starts without errors.

Status:
⬜ Pass
⬜ Fail

---

### TC-002

Description:
Open backend in browser.

Steps:
Visit

http://localhost:8000

Expected Result:

✅ Browser loads successfully.

Status:
⬜ Pass
⬜ Fail

---

### TC-003

Description:
Backend reload.

Steps:
1. Edit a Python file.
2. Save it.

Expected Result:

✅ FastAPI automatically reloads.

Status:
⬜ Pass
⬜ Fail

---

# Phase 2 - Firebase Connection

### TC-004

Description:
Backend connects to Firebase.

Expected Result:

✅ No authentication errors.

Status:
⬜ Pass
⬜ Fail

---

### TC-005

Description:
Read data from Firebase.

Expected Result:

✅ Request returns successfully.

Status:
⬜ Pass
⬜ Fail

---

# Phase 3 - Ticket Creation

### TC-006

Create ticket with valid information.

Expected Result:

✅ Ticket created.

---

### TC-007

Leave customer name empty.

Expected Result:

❌ Validation error.

---

### TC-008

Leave email empty.

Expected Result:

❌ Validation error.

---

### TC-009

Invalid email format.

Example:

abc

Expected Result:

❌ Validation error.

---

### TC-010

Subject empty.

Expected Result:

❌ Validation error.

---

### TC-011

Description empty.

Expected Result:

❌ Validation error.

---

### TC-012

Ticket ID generated automatically.

Expected Result:

✅ ID format:

TKT-0001

---

### TC-013

Created timestamp generated.

Expected Result:

✅ Current timestamp stored.

---

# Phase 4 - Ticket List

### TC-014

View all tickets.

Expected Result:

✅ All tickets displayed.

---

### TC-015

Newest ticket appears.

Expected Result:

✅ Newly created ticket visible.

---

# Phase 5 - Search

### TC-016

Search by customer name.

Expected Result:

✅ Matching tickets shown.

---

### TC-017

Search by email.

Expected Result:

✅ Matching ticket shown.

---

### TC-018

Search by Ticket ID.

Expected Result:

✅ Exact ticket returned.

---

### TC-019

Search random text.

Expected Result:

✅ Empty results.

---

# Phase 6 - Filter

### TC-020

Filter Open.

Expected Result:

✅ Only Open tickets.

---

### TC-021

Filter In Progress.

Expected Result:

✅ Only In Progress tickets.

---

### TC-022

Filter Closed.

Expected Result:

✅ Only Closed tickets.

---

# Phase 7 - Ticket Details

### TC-023

Open ticket details.

Expected Result:

✅ Full information displayed.

---

### TC-024

Open invalid Ticket ID.

Expected Result:

❌ Ticket not found.

---

# Phase 8 - Update Ticket

### TC-025

Update status to In Progress.

Expected Result:

✅ Status updates.

---

### TC-026

Update status to Closed.

Expected Result:

✅ Status updates.

---

### TC-027

Add note.

Expected Result:

✅ Note saved.

---

# Phase 9 - UI

### TC-028

Open website on desktop.

Expected Result:

✅ Layout correct.

---

### TC-029

Open website on mobile width.

Expected Result:

✅ Responsive layout.

---

### TC-030

Navigation between pages.

Expected Result:

✅ Pages work correctly.

---

# Phase 10 - Final Checks

### TC-031

No console errors.

Expected Result:

✅ Browser console clean.

---

### TC-032

No backend errors.

Expected Result:

✅ Terminal shows no unexpected errors.

---

### TC-033

All assessment features work.

Checklist:

- Ticket creation
- Ticket listing
- Search
- Filter
- Update status
- Notes
- Detail page

Expected Result:

✅ Everything functional.

---

# Notes

Use this section to record bugs discovered during testing.

| Date | Issue | Fixed |
|------|-------|-------|
| | | |