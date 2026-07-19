from pydantic import BaseModel, EmailStr


class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginUser(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    name: str
    email: EmailStr
    wallet: float
    level: str
    experience: int