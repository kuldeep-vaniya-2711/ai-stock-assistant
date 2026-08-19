import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi


# -----------------------------------------
# Load Environment Variables
# -----------------------------------------

load_dotenv()


MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")


# -----------------------------------------
# Validate Environment Variables
# -----------------------------------------

if not MONGODB_URI:
    raise RuntimeError(
        "❌ MONGODB_URI environment variable is missing"
    )


if not DB_NAME:
    raise RuntimeError(
        "❌ DB_NAME environment variable is missing"
    )


# -----------------------------------------
# MongoDB Client
# -----------------------------------------

client = MongoClient(

    MONGODB_URI,

    # MongoDB Stable API
    server_api=ServerApi("1"),

    # Connection timeouts
    serverSelectionTimeoutMS=10000,

    connectTimeoutMS=10000,

    socketTimeoutMS=20000,

    # Retry writes
    retryWrites=True,

    # TLS
    tls=True

)


# -----------------------------------------
# Connection Test
# -----------------------------------------

try:

    client.admin.command("ping")

    print("========================================")
    print("✅ MongoDB Connected Successfully")
    print("📦 Database:", DB_NAME)
    print("========================================")

except Exception as e:

    print("========================================")
    print("❌ MongoDB Connection Failed")
    print("❌ Error:", e)
    print("========================================")

    raise


# -----------------------------------------
# Database
# -----------------------------------------

db = client[DB_NAME]


# -----------------------------------------
# Collections
# -----------------------------------------

users = db["users"]

watchlist = db["watchlist"]

portfolio = db["portfolio"]

transactions = db["transactions"]

price_alerts = db["price_alerts"]

notifications = db["notifications"]

otp_collection = db["otp_verifications"]