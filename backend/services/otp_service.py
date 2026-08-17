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

    otp_collection.delete_many({
        "email": user_data.email
    })

    otp_collection.insert_one({

        "name": user_data.name,

        "email": user_data.email,

        "password": user_data.password,

        "otp": otp,

        "expires_at": datetime.now(timezone.utc) + timedelta(minutes=5)

    })


# -----------------------------
# Send OTP
# -----------------------------
def create_and_send_otp(user_data):

    existing = users.find_one({

        "email": user_data.email

    })

    if existing:

        return {

            "success": False,

            "message": "Email already registered."

        }

    otp = generate_otp()

    save_otp(user_data, otp)

    success = send_email_otp(

        user_data.email,

        otp

    )

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

    data = otp_collection.find_one({

        "email": email,

        "otp": otp

    })

    if data is None:

        return False

    if datetime.now(timezone.utc) > data["expires_at"]:

        otp_collection.delete_one({

            "_id": data["_id"]

        })

        return False

    existing = users.find_one({

        "email": email

    })

    if existing:

        otp_collection.delete_one({

            "_id": data["_id"]

        })

        return False

    users.insert_one({

        "name": data["name"],

        "email": data["email"],

        "password": hash_password(data["password"]),

        "wallet": 5000.0,

        "level": "Beginner",

        "experience": 0

    })

    create_notification(

        email=data["email"],

        title="Welcome 🎉",

        message="Your account has been created successfully."

    )

    try:

        now = datetime.now()

        message = f"""
🎉 <b>New User Registered</b>

👤 Name : {data['name']}

📧 Email : {data['email']}

💰 Wallet : ₹5000

📅 {now.strftime("%d-%m-%Y")}

⏰ {now.strftime("%I:%M %p")}
"""

        send_telegram(message)

    except Exception as e:

        print("Telegram Error:", e)

    otp_collection.delete_one({

        "_id": data["_id"]

    })

    return True


# -----------------------------
# Resend OTP
# -----------------------------
def resend_otp(user_data):

    return create_and_send_otp(user_data)