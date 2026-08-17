import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv

load_dotenv()

EMAIL = os.getenv("EMAIL_ADDRESS")
PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_email_otp(receiver_email, otp):

    if not EMAIL or not PASSWORD:

        print("Email credentials missing.")

        return False

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

    message = MIMEMultipart()

    message["From"] = EMAIL

    message["To"] = receiver_email

    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    server = None

    try:

        server = smtplib.SMTP("smtp.gmail.com", 587)

        server.starttls()

        server.login(

            EMAIL,

            PASSWORD

        )

        server.sendmail(

            EMAIL,

            receiver_email,

            message.as_string()

        )

        return True

    except Exception as e:

        print("Email Error:", e)

        return False

    finally:

        if server:

            server.quit()