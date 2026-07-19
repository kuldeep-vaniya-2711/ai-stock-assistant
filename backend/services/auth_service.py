from datetime import datetime

from database.mongodb import users

from utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

from utils.send_telegram import send_telegram


# ----------------------------------
# Register User
# ----------------------------------

def register_user(user):

    existing_user = users.find_one(
        {
            "email": user.email
        }
    )

    if existing_user:

        return {
            "success": False,
            "message": "Email already registered."
        }

    new_user = {

        "name": user.name,

        "email": user.email,

        "password": hash_password(user.password),

        # Paper Trading Defaults
        "wallet": 5000.0,

        "level": "Beginner",

        "experience": 0

    }

    users.insert_one(new_user)

    # ----------------------------
    # Telegram Notification
    # ----------------------------

    try:

        now = datetime.now()

        message = f"""
🎉 <b>New User Registered</b>

👤 Name : {user.name}

📧 Email : {user.email}

💰 Wallet : ₹5000

📈 Level : Beginner

📅 {now.strftime("%d-%m-%Y")}

⏰ {now.strftime("%I:%M %p")}
"""

        send_telegram(message)

    except Exception as e:

        print("Telegram Error:", e)

    return {

        "success": True,

        "message": "User registered successfully."

    }


# ----------------------------------
# Login User
# ----------------------------------

def login_user(user):

    existing_user = users.find_one(
        {
            "email": user.email
        }
    )

    if not existing_user:

        return {

            "success": False,

            "message": "Invalid email or password."

        }

    if not verify_password(
        user.password,
        existing_user["password"]
    ):

        return {

            "success": False,

            "message": "Invalid email or password."

        }

    token = create_access_token({

        "sub": str(existing_user["_id"]),

        "email": existing_user["email"],

        "name": existing_user["name"]

    })

    return {

        "success": True,

        "message": "Login successful.",

        "access_token": token,

        "token_type": "bearer",

        "user": {

            "name": existing_user["name"],

            "email": existing_user["email"],

            "wallet": existing_user.get(
                "wallet",
                5000.0
            ),

            "level": existing_user.get(
                "level",
                "Beginner"
            ),

            "experience": existing_user.get(
                "experience",
                0
            )

        }

    }