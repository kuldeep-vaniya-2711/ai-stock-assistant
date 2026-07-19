import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

uri = os.getenv("MONGODB_URI")

client = MongoClient(uri)

# Connection Test
client.admin.command("ping")
print("✅ MongoDB Connected Successfully")

# Database
db = client[os.getenv("DB_NAME")]

# Collections
users = db["users"]

watchlist = db["watchlist"]

portfolio = db["portfolio"]

transactions = db["transactions"]

price_alerts = db["price_alerts"]

notifications = db["notifications"]

otp_collection = db["otp_verifications"]