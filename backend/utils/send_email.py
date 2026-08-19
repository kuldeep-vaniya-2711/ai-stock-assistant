import os

import resend

from dotenv import load_dotenv


# ==========================================
# Load Environment Variables
# ==========================================

load_dotenv()


RESEND_API_KEY = os.getenv("RESEND_API_KEY")

RESEND_FROM_EMAIL = os.getenv(
    "RESEND_FROM_EMAIL"
)


# ==========================================
# Send OTP Email
# ==========================================

def send_email_otp(receiver_email, otp):

    print("\n" + "=" * 60)
    print("📧 Resend Email")
    print("📨 Receiver :", receiver_email)
    print("🔐 OTP      :", otp)
    print("=" * 60)


    # --------------------------------------
    # Check API Key
    # --------------------------------------

    if not RESEND_API_KEY:

        print(
            "❌ RESEND_API_KEY is missing"
        )

        return False


    # --------------------------------------
    # Check From Email
    # --------------------------------------

    if not RESEND_FROM_EMAIL:

        print(
            "❌ RESEND_FROM_EMAIL is missing"
        )

        return False


    try:

        resend.api_key = RESEND_API_KEY


        # ----------------------------------
        # Email Content
        # ----------------------------------

        params = {

            "from": RESEND_FROM_EMAIL,

            "to": [
                receiver_email
            ],

            "subject":
                "AI Stock Assistant - Email Verification OTP",

            "html": f"""
<!DOCTYPE html>

<html>

<body>

<h2>
AI Stock Assistant
</h2>

<p>
Hello,
</p>

<p>
Your OTP for email verification is:
</p>

<h1>
{otp}
</h1>

<p>
This OTP is valid for <b>5 minutes</b>.
</p>

<p>
Please do not share this OTP with anyone.
</p>

<br>

<p>
Regards,<br>
<b>AI Stock Assistant</b>
</p>

</body>

</html>
"""

        }


        # ----------------------------------
        # Send
        # ----------------------------------

        response = resend.Emails.send(
            params
        )


        print(
            "✅ Resend Email Sent"
        )

        print(
            "📨 Resend Response:",
            response
        )


        return True


    except Exception as e:

        print(
            "❌ Resend Email Error:",
            e
        )

        return False