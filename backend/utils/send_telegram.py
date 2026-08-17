import os
import requests

from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")


def send_telegram(message):

    if not BOT_TOKEN or not CHAT_ID:

        print("Telegram credentials missing.")

        return False

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    payload = {

        "chat_id": CHAT_ID,

        "text": message,

        "parse_mode": "HTML"

    }

    try:

        response = requests.post(

            url,

            json=payload,

            timeout=10

        )

        response.raise_for_status()

        print("✅ Telegram Notification Sent")

        return True

    except requests.RequestException as e:

        print("Telegram Error:", e)

        return False