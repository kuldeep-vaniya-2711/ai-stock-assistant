from database.mongodb import users


def get_profile(email):

    user = users.find_one(
        {"email": email},
        {
            "_id": 0,
            "password": 0
        }
    )

    if not user:
        return {
            "success": False,
            "message": "User not found."
        }

    # Default values for old users
    user["wallet"] = user.get("wallet", 5000.0)
    user["level"] = user.get("level", "Beginner")
    user["experience"] = user.get("experience", 0)

    return user


def update_wallet(email, wallet):

    users.update_one(
        {"email": email},
        {
            "$set": {
                "wallet": wallet
            }
        }
    )


def add_experience(email, xp):

    user = users.find_one({"email": email})

    if not user:
        return

    current_xp = user.get("experience", 0)
    current_level = user.get("level", "Beginner")

    new_xp = current_xp + xp

    level = current_level

    if new_xp >= 500:
        level = "Expert"
    elif new_xp >= 200:
        level = "Intermediate"

    users.update_one(
        {"email": email},
        {
            "$set": {
                "experience": new_xp,
                "level": level
            }
        }
    )