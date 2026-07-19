from fastapi import APIRouter
from models.user import RegisterUser
from services.auth_service import register_user
from services.auth_service import register_user, login_user
from models.user import RegisterUser, LoginUser


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: RegisterUser):
    return register_user(user)

@router.post("/login")
def login(user: LoginUser):
    return login_user(user)