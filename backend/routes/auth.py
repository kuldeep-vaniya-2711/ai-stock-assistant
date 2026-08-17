from fastapi import APIRouter

from models.user import RegisterUser, LoginUser

from services.auth_service import (
    register_user,
    login_user
)

router = APIRouter(

    prefix="/auth",

    tags=["Authentication"]

)


@router.post("/register")
def register(user: RegisterUser):

    return register_user(user)


@router.post("/login")
def login(user: LoginUser):

    return login_user(user)