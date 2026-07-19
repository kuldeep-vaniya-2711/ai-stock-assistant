from fastapi import APIRouter

from models.otp import (
    SendOTP,
    VerifyOTP
)

from services.otp_service import (
    create_and_send_otp,
    verify_otp,
    resend_otp
)

router = APIRouter(
    prefix="/otp",
    tags=["OTP"]
)


# -----------------------------
# Send OTP
# -----------------------------
@router.post("/send")
def send_otp(data: SendOTP):

    return create_and_send_otp(data)


# -----------------------------
# Verify OTP
# -----------------------------
@router.post("/verify")
def verify(data: VerifyOTP):

    success = verify_otp(
        data.email,
        data.otp
    )

    if success:

        return {

            "success": True,

            "message": "OTP Verified Successfully"

        }

    return {

        "success": False,

        "message": "Invalid or Expired OTP"

    }

@router.post("/resend")
def resend(data: SendOTP):

    return resend_otp(data)