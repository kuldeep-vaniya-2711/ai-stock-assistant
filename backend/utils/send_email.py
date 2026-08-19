import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv


# --------------------------------------------------
# Load Environment Variables
# --------------------------------------------------

load_dotenv()

EMAIL = os.getenv("EMAIL_ADDRESS")
PASSWORD = os.getenv("EMAIL_PASSWORD")


# --------------------------------------------------
# Send OTP Email
# --------------------------------------------------

def send_email_otp(receiver_email, otp):

    # Check credentials
    if not EMAIL:
        print("❌ EMAIL_ADDRESS is missing")

        return False

    if not PASSWORD:
        print("❌ EMAIL_PASSWORD is missing")

        return False

    print("📧 SMTP Email:", EMAIL)
    print("🔐 SMTP Password Loaded:", bool(PASSWORD))
    print("📨 Receiver:", receiver_email)

    subject = "AI Stock Assistant - Email Verification OTP"

    body = f"""
Hello,

Your OTP for AI Stock Assistant is:

{otp}

This OTP is valid for 5 minutes.

Do not share this OTP with anyone.

Regards,
AI Stock Assistant
"""

    # --------------------------------------------------
    # Create Email
    # --------------------------------------------------

    message = MIMEMultipart()

    message["From"] = EMAIL
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(
        MIMEText(body, "plain")
    )

    server = None

    try:

        print("🔄 Connecting to Gmail SMTP...")

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587,
            timeout=30
        )

        print("✅ SMTP Connection Established")

        server.ehlo()

        server.starttls()

        server.ehlo()

        print("🔐 Logging into Gmail...")

        server.login(
            EMAIL,
            PASSWORD
        )

        print("✅ Gmail Authentication Successful")

        server.sendmail(
            EMAIL,
            receiver_email,
            message.as_string()
        )

        print("✅ OTP Email Sent Successfully")

        return True

    except smtplib.SMTPAuthenticationError as e:

        print(
            "❌ Gmail Authentication Error:",
            e
        )

        print(
            "⚠️ Check EMAIL_ADDRESS and EMAIL_PASSWORD."
        )

        print(
            "⚠️ EMAIL_PASSWORD must be a Gmail App Password."
        )

        return False

    except smtplib.SMTPException as e:

        print(
            "❌ SMTP Error:",
            e
        )

        return False

    except Exception as e:

        print(
            "❌ Email Error:",
            e
        )

        return False

    finally:

        if server:

            try:

                server.quit()

            except Exception:

                pass