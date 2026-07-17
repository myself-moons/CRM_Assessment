# Custom CRM

A simple Customer Support CRM built as part of an AI & Tech Internship Assessment. The project serves as a foundation for future FastAPI web applications while following a clean, beginner-friendly architecture.

The application allows support teams to create, manage, search, and update customer support tickets using a REST API backed by Firebase Realtime Database.

---

# Live Demo

**Frontend:**  
https://custom-crm-3212b.web.app

**Backend API:**  
https://efficient-mindfulness-production-c1e7.up.railway.app

**API Documentation:**  
https://efficient-mindfulness-production-c1e7.up.railway.app/docs

---

# Tech Stack

## Backend
- Python
- FastAPI

## Frontend
- HTML
- CSS
- Vanilla JavaScript

## Database
- Firebase Realtime Database

## Deployment
- Railway (Backend)
- Firebase Hosting (Frontend)

---

# Features

## Ticket Management

- Create new support tickets
- Auto-generated Ticket IDs
- Save customer information
- Automatic timestamps
- Input validation

## Ticket List

- View all tickets
- Responsive table layout
- View ticket details

## Search & Filter

Search tickets by:

- Ticket ID
- Customer Name
- Customer Email
- Subject

Filter tickets by:

- Open
- In Progress
- Closed

## Ticket Updates

- Update ticket status
- Add notes/comments
- Automatic updated timestamp

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/tickets/` | Create a ticket |
| GET | `/tickets/` | Get all tickets |
| GET | `/tickets/{ticketId}` | Get ticket details |
| PUT | `/tickets/{ticketId}` | Update ticket |

---

# Project Structure

```text
custom-crm/
│
├── backend/
│   ├── main.py
│   ├── routes.py
│   ├── services.py
│   ├── firebase.py
│   ├── models.py
│   ├── config.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── create.html
│   ├── ticket.html
│   ├── css/
│   └── js/
│
├── firebase.json
├── .firebaserc
├── README.md
└── .gitignore
```

---

# Architecture

```
Frontend (HTML/CSS/JavaScript)
            │
            ▼
     FastAPI Backend
            │
            ▼
Firebase Realtime Database
```

The frontend communicates with the FastAPI backend through REST API calls. The backend performs validation, business logic, and stores ticket data inside Firebase Realtime Database.

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
FIREBASE_CREDENTIALS=secrets/firebase-key.json
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com/
```

---

# Running the Project

## Clone the repository

```bash
git clone https://github.com/myself-moons/CRM_Assessment.git

cd custom-crm
```

---

## Backend Setup

Move into the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv .venv
```

### Activate the virtual environment

**Windows**

```bash
.venv\Scripts\activate
```

**Linux / macOS**

```bash
source .venv/bin/activate
```

Install the dependencies.

```bash
pip install -r requirements.txt
```

Run the FastAPI server.

```bash
uvicorn main:app --reload
```

The backend will be available at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open the **frontend** folder using **VS Code Live Server** (recommended) or any local web server.

Ensure that `frontend/js/api.js` points to the appropriate backend URL before running the application.

---

# Deployment

## Backend

- Railway

## Frontend

- Firebase Hosting

---

# Manual Testing

The project includes manual test cases covering:

- Backend startup
- Firebase connectivity
- Ticket creation
- Validation
- Ticket listing
- Search
- Status filtering
- Ticket updates
- Notes
- Responsive UI
- Navigation
- Error handling

---

# Future Improvements

- Role-Based Access Control (RBAC)
- Admin Dashboard
- Dashboard Analytics

---

