from datetime import datetime

from database.mongodb import notifications


def create_notification(
    email,
    title,
    message
):

    notifications.insert_one({

        "email": email,

        "title": title,

        "message": message,

        "is_read": False,

        "created_at": datetime.utcnow()

    })


def get_notifications(email):

    return list(

        notifications.find(

            {"email": email},

            {"_id": 0}

        ).sort(

            "created_at",
            -1

        )

    )


def mark_all_read(email):

    result = notifications.update_many(

        {

            "email": email,

            "is_read": False

        },

        {

            "$set": {

                "is_read": True

            }

        }

    )

    return {

        "success": True,

        "updated": result.modified_count,

        "message": "Notifications Updated"

    }