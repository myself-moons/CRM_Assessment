"""
main.py

This is the entry point of our Support CRM backend.

In this, We:
1. Create the FastAPI application.
2. Configure CORS.
3. Register API routes.

Use "uvicorn main:app --reload" command to run the backend server in dev mode.
"""

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi import status
from routes import router

# Create the FastAPI application
app = FastAPI(
    title="Support CRM API",
    version="1"
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    errors = []

    for error in exc.errors():
        loc = [part for part in error.get("loc", []) if part != "body"]
        msg = error.get("msg", "")

        if loc:
            field_name = str(loc[-1]).replace("_", " ").capitalize()
            errors.append(f"{field_name}: {msg}")
        else:
            errors.append(msg)

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "message": "Validation failed: " + " | ".join(errors),
        },
    )

# Include the API routes from routes.py
app.include_router(router)

# Allow only our frontend URLs to communicate with this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://curly-space-goldfish-5vgj4vprp4j3vg5j-5500.app.github.dev",
        "https://custom-crm-3212b.web.app",
        "https://custom-crm-3212b.firebaseapp.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """
    Simple endpoint to verify the API is running.
    """
    return {
        "success": True,
        "message": "Welcome to the Support CRM API!"
    }


@app.get("/health")
def health_check():
    """
    Health endpoint.
    Used to check whether the backend is running correctly.
    """
    return {
        "success": True,
        "message": "CRM API is running."
    }