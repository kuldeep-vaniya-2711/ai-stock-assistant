# from fastapi import APIRouter
# from database.mongodb import users

# router = APIRouter(
#     prefix="/user",
#     tags=["User"]
# )


# @router.get("/profile/{email}")
# def profile(email: str):

#     user = users.find_one(
#         {"email": email},
#         {
#             "_id": 0,
#             "password": 0
#         }
#     )

#     if not user:
#         return {
#             "success": False,
#             "message": "User not found."
#         }

#     # Default values for old users
#     user["wallet"] = user.get("wallet", 5000.0)
#     user["level"] = user.get("level", "Beginner")
#     user["experience"] = user.get("experience", 0)

#     return user

from fastapi import APIRouter
from services.user_service import get_profile

router = APIRouter(
    prefix="/user",
    tags=["User"]
)


@router.get("/profile/{email}")
def profile(email: str):
    return get_profile(email)