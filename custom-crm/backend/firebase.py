"""
firebase.py

Initializes Firebase Admin SDK.

Works both locally (firebase-key.json)
and in production (Railway environment variable).
"""

import json

import firebase_admin
from firebase_admin import credentials, db

from config import FIREBASE_CREDENTIALS, FIREBASE_DATABASE_URL


# Initialize Firebase only once
if not firebase_admin._apps:

    # If the value starts with "{", treat it as JSON.
    if FIREBASE_CREDENTIALS.strip().startswith("{"):
        cred = credentials.Certificate(
            json.loads(FIREBASE_CREDENTIALS)
        )

    # Otherwise treat it as a file path (local development)
    else:
        cred = credentials.Certificate(FIREBASE_CREDENTIALS)

    firebase_admin.initialize_app(
        cred,
        {
            "databaseURL": FIREBASE_DATABASE_URL
        }
    )

# Database root reference
database = db.reference("/")