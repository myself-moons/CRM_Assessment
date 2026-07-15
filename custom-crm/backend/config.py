"""
config.py

Loads environment variables for the application.

This file should only contain configuration values.
No Firebase code should be written here.
"""

from pathlib import Path

from dotenv import load_dotenv
import os

# Absolute path to the backend folder
BASE_DIR = Path(__file__).resolve().parent

# Load variables from .env
load_dotenv(BASE_DIR / ".env")

# Firebase configuration
FIREBASE_CREDENTIALS = os.getenv("FIREBASE_CREDENTIALS")
FIREBASE_DATABASE_URL = os.getenv("FIREBASE_DATABASE_URL")