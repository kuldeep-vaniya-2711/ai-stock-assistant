from pydantic import BaseModel

class SendOTP(BaseModel):

    name: str
    email: str
    password: str


class VerifyOTP(BaseModel):

    email: str
    otp: str




class SendOTP(BaseModel):
    name: str
    email: str
    password: str


class VerifyOTP(BaseModel):
    email: str
    otp: str