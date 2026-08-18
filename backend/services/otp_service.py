import random
from datetime import datetime, timedelta, timezone

from database.mongodb import otp_collection
from database.mongodb import users

from utils.security import hash_password
from utils.send_email import send_email_otp
from utils.send_telegram import send_telegram
from services.notification_service import create_notification


# -----------------------------
# Generate OTP
# -----------------------------
def generate_otp():

    return str(random.randint(100000, 999999))


# -----------------------------
# Save OTP
# -----------------------------
def save_otp(user_data, otp):

    # Delete previous OTP for this email
    otp_collection.delete_many({
        "email": user_data.email
    })

    # Save new OTP
    otp_collection.insert_one({

        "name": user_data.name,

        "email": user_data.email,

        "password": user_data.password,

        "otp": otp,

        # Store expiry time in UTC
        "expires_at": datetime.now(timezone.utc) + timedelta(minutes=5)

    })


# -----------------------------
# Send OTP
# -----------------------------
def create_and_send_otp(user_data):

    # Check whether email is already registered
    existing = users.find_one({

        "email": user_data.email

    })

    if existing:

        return {

            "success": False,

            "message": "Email already registered."

        }

    # Generate OTP
    otp = generate_otp()

    # Save OTP in MongoDB
    save_otp(user_data, otp)

    # Send OTP through email
    success = send_email_otp(

        user_data.email,

        otp

    )

    # Terminal log
    print("\n" + "=" * 60)
    print("📧 Receiver Email :", user_data.email)
    print("🔐 Generated OTP  :", otp)
    print("📨 Email Status   :", success)
    print("=" * 60 + "\n")

    if success:

        return {

            "success": True,

            "message": "OTP Sent Successfully"

        }

    return {

        "success": False,

        "message": "Failed to send OTP"

    }


# -----------------------------
# Verify OTP
# -----------------------------
def verify_otp(email, otp):

    # Find OTP
    data = otp_collection.find_one({

        "email": email,

        "otp": otp

    })

    # OTP not found
    if data is None:

        return False

    # -----------------------------
    # Handle MongoDB datetime
    # -----------------------------

    expires_at = data["expires_at"]

    # PyMongo normally returns MongoDB
    # datetime as naive UTC datetime.
    #
    # Convert it to timezone-aware UTC
    # before comparing with datetime.now(timezone.utc).

    if expires_at.tzinfo is None:

        expires_at = expires_at.replace(
            tzinfo=timezone.utc
        )

    # -----------------------------
    # Check OTP expiry
    # -----------------------------

    if datetime.now(timezone.utc) > expires_at:

        otp_collection.delete_one({

            "_id": data["_id"]

        })

        return False

    # -----------------------------
    # Check existing user
    # -----------------------------

    existing = users.find_one({

        "email": email

    })

    if existing:

        otp_collection.delete_one({

            "_id": data["_id"]

        })

        return False

    # -----------------------------
    # Create new user
    # -----------------------------

    users.insert_one({

        "name": data["name"],

        "email": data["email"],

        "password": hash_password(
            data["password"]
        ),

        "wallet": 5000.0,

        "level": "Beginner",

        "experience": 0

    })

    # -----------------------------
    # Create welcome notification
    # -----------------------------

    create_notification(

        email=data["email"],

        title="Welcome 🎉",

        message="Your account has been created successfully."

    )

    # -----------------------------
    # Telegram notification
    # -----------------------------

    try:

        # Use UTC-aware datetime
        now = datetime.now(timezone.utc)

        message = f"""
🎉 <b>New User Registered</b>

👤 Name : {data['name']}

📧 Email : {data['email']}

💰 Wallet : ₹5000

📅 {now.strftime("%d-%m-%Y")}

⏰ {now.strftime("%I:%M %p")} UTC
"""

        send_telegram(message)

    except Exception as e:

        print("Telegram Error:", e)

    # -----------------------------
    # Delete used OTP
    # -----------------------------

    otp_collection.delete_one({

        "_id": data["_id"]

    })

    # Registration successful
    return True


# -----------------------------
# Resend OTP
# -----------------------------
def resend_otp(user_data):

    return create_and_send_otp(user_data)