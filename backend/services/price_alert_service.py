from database.mongodb import price_alerts
from services.market_service import get_live_price
from datetime import datetime

from utils.send_telegram import send_telegram

def create_alert(item):

    existing = price_alerts.find_one({
        "email": item.email,
        "symbol": item.symbol,
        "target_price": item.target_price,
        "condition": item.condition
    })

    if existing:

        return {
            "success": False,
            "message": "Alert already exists."
        }

    price_alerts.insert_one({
        "email": item.email,
        "symbol": item.symbol,
        "target_price": item.target_price,
        "condition": item.condition
    })

    return {
        "success": True,
        "message": "Price Alert Created Successfully"
    }


def get_alerts(email):

    data = list(
        price_alerts.find(
            {"email": email},
            {"_id": 0}
        )
    )

    return data
def delete_alert(email, symbol, target_price):

    result = price_alerts.delete_one(
        {
            "email": email,
            "symbol": symbol,
            "target_price": target_price
        }
    )

    if result.deleted_count == 0:

        return {
            "success": False,
            "message": "Alert not found."
        }

    return {
        "success": True,
        "message": "Alert Deleted Successfully"
    }


def check_price_alerts():

    alerts = list(price_alerts.find())

    triggered = []

    for alert in alerts:

        current_price = get_live_price(
            alert["symbol"]
        )

        if current_price is None:
            continue

        hit = False

        if (
            alert["condition"] == "ABOVE"
            and current_price >= alert["target_price"]
        ):
            hit = True

        elif (
            alert["condition"] == "BELOW"
            and current_price <= alert["target_price"]
        ):
            hit = True

        if hit:
            triggered.append(
                {
                    "email": alert["email"],
                    "symbol": alert["symbol"],
                    "target_price": alert["target_price"],
                    "current_price": round(current_price, 2),
                    "condition": alert["condition"]
                }
            )

            try:
                now = datetime.now()

                message = f"""
🚨 <b>PRICE ALERT TRIGGERED</b>

👤 User : {alert["email"]}

📈 Stock : {alert["symbol"]}

🎯 Target : ₹{alert["target_price"]}

💹 Current : ₹{round(current_price,2)}

📊 Condition : {alert["condition"]}

📅 {now.strftime("%d-%m-%Y")}

⏰ {now.strftime("%I:%M %p")}
"""

                send_telegram(message)

                price_alerts.delete_one(
                    {
                        "_id": alert["_id"]
                    }
                )

            except Exception as e:
                print("Telegram Error :", e)

    return triggered