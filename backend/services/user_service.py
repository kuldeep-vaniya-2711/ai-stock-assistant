from database.mongodb import users


def calculate_level(xp):

    if xp >= 500:
        return "Expert"

    elif xp >= 250:
        return "Advanced"

    elif xp >= 100:
        return "Intermediate"

    return "Beginner"


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

    xp = user.get("experience", 0)

    user["wallet"] = round(user.get("wallet", 5000), 2)

    user["experience"] = xp

    user["level"] = calculate_level(xp)

    user["streak"] = user.get("streak", 0)

    user["joined"] = user.get("joined", "")

    return user


def update_wallet(email, wallet):

    users.update_one(

        {"email": email},

        {

            "$set": {

                "wallet": round(wallet, 2)

            }

        }

    )


def add_experience(email, xp):

    user = users.find_one({"email": email})

    if not user:
        return

    new_xp = user.get("experience", 0) + xp

    users.update_one(

        {"email": email},

        {

            "$set": {

                "experience": new_xp,
                "level": calculate_level(new_xp)

            }

        }

    )