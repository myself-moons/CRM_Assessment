# Support CRM

A simple Customer Support CRM built as part of the Datastraw AI & Tech Internship Assessment.

This project is a full-stack web application that allows support teams to create, manage, search, and update customer support tickets. It is built with a simple and clean architecture that is easy to understand and maintain.

---

## Tech Stack

### Backend
- Python
- FastAPI

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Database
- Firebase Realtime Database

### Deployment
- Railway (Backend)
- Firebase Hosting (Frontend)

---

## Features

### Ticket Management
- Create new support tickets
- Auto-generate Ticket IDs
- Save customer details
- Save creation date and time

### Ticket List
- View all tickets
- Clean and responsive table
- View ticket details

### Search & Filter
- Search by:
  - Ticket ID
  - Customer Name
  - Customer Email
  - Subject
- Filter tickets by:
  - Open
  - In Progress
  - Closed

### Update Tickets
- Change ticket status
- Add notes or comments
- Save update time

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/tickets` | Create a ticket |
| GET | `/api/tickets` | Get all tickets |
| GET | `/api/tickets/{ticketId}` | Get one ticket |
| PUT | `/api/tickets/{ticketId}` | Update a ticket |

---

## Project Structure

```
SupportCRM/
│
├── backend/
│   ├── main.py
│   ├── routes.py
│   ├── services.py
│   ├── firebase.py
│   ├── models.py
│   ├── config.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── create.html
│   ├── ticket.html
│   ├── css/
│   └── js/
│
├── README.md
└── .env.example
```

---

## How It Works

```
Frontend (HTML, CSS, JavaScript)
            │
            ▼
      FastAPI Backend
            │
            ▼
Firebase Realtime Database
```

The frontend sends requests to the FastAPI backend. The backend handles the logic and stores data in Firebase Realtime Database.

---

## Running the Project

### Clone the repository

```bash
git clone <repository-url>
cd SupportCRM
```

### Start the Backend

```bash
cd backend

python -m venv .venv
```

Activate the virtual environment

Windows

```bash
.venv\Scripts\activate
```

Linux / macOS

```bash
source .venv/bin/activate
```

Install the required packages

```bash
pip install -r requirements.txt
```

Run the server

```bash
uvicorn main:app --reload
```

---

### Start the Frontend

Open the `frontend` folder using a local web server or open `index.html` in your browser.

---

## Personal Improvements

- Google Login
- Role-Based Access Control (RBAC)
- Dashboard
- Better Search
- File Attachments
- Email Notifications

---

## Project Goal

The goal of this project is to build a simple, clean, and working Customer Support CRM while following a simple project structure. The focus is on writing readable code, building REST APIs, and creating a responsive user interface.
