from fastapi import APIRouter, Depends

from services.user_service import get_profile

from utils.auth_dependency import get_current_user


router = APIRouter(

    prefix="/user",

    tags=["User"]

)


@router.get("/profile/{email}")
def profile(

    email: str,

    current_user: dict = Depends(
        get_current_user
    )

):

    if current_user["email"] != email:

        return {
            "success": False,
            "message": "Unauthorized access."
        }

    return get_profile(email)