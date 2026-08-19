import os

import resend

from dotenv import load_dotenv


# -----------------------------
# Load Environment Variables
# -----------------------------

load_dotenv()


RESEND_API_KEY = os.getenv("RESEND_API_KEY")


# -----------------------------
# Send OTP Email
# -----------------------------

def send_email_otp(receiver_email, otp):

    # Check API key
    if not RESEND_API_KEY:

        print("❌ RESEND_API_KEY is missing.")

        return False


    try:

        # Configure Resend
        resend.api_key = RESEND_API_KEY


        # Email subject
        subject = "AI Stock Assistant - Email Verification OTP"


        # HTML email
        html_body = f"""
        <html>

        <body>

            <h2>AI Stock Assistant</h2>

            <p>Hello,</p>

            <p>
                Your OTP for AI Stock Assistant is:
            </p>

            <h1
                style="
                    letter-spacing: 5px;
                    color: #2563eb;
                "
            >
                {otp}
            </h1>

            <p>
                This OTP is valid for <b>5 minutes</b>.
            </p>

            <p>
                Do not share this OTP with anyone.
            </p>

            <br>

            <p>
                Regards,<br>
                <b>AI Stock Assistant</b>
            </p>

        </body>

        </html>
        """


        # Resend parameters
        params = {

            "from": "AI Stock Assistant <onboarding@resend.dev>",

            "to": [receiver_email],

            "subject": subject,

            "html": html_body

        }


        print("=" * 60)

        print("📧 Resend Email")

        print("📨 Receiver :", receiver_email)

        print("🔐 OTP      :", otp)

        print("🚀 Sending email through Resend...")


        # Send email
        response = resend.Emails.send(params)


        print("✅ Resend Response:", response)

        print("=" * 60)


        return True


    except Exception as e:

        print("=" * 60)

        print("❌ Resend Email Error:", e)

        print("=" * 60)

        return False