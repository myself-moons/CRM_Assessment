"""
firebase.py

Initializes Firebase Admin SDK.

Firebase should only be initialized once.
Other files will import the database reference from here.
"""
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from config import FIREBASE_CREDENTIALS, FIREBASE_DATABASE_URL

# Initialize Firebase only once
if not firebase_admin._apps:
    cred = credentials.Certificate(FIREBASE_CREDENTIALS)

    firebase_admin.initialize_app(
        cred,
        {
            "databaseURL": FIREBASE_DATABASE_URL
        }
    )

# Database root reference
database = db.reference("/")