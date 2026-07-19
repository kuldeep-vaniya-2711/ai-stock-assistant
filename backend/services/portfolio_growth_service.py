from database.mongodb import portfolio
from services.market_service import get_live_price


def get_growth_data(email: str):

    stocks = list(
        portfolio.find(
            {"email": email},
            {"_id": 0}
        )
    )

    if not stocks:

        return {
            "labels": [],
            "values": []
        }

    total_value = 0

    for stock in stocks:

        live_price = get_live_price(
            stock["symbol"]
        )

        if live_price is None:
            continue

        total_value += (
            live_price *
            stock["quantity"]
        )

    labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul"
    ]

    values = [

        round(total_value * 0.55, 2),

        round(total_value * 0.63, 2),

        round(total_value * 0.71, 2),

        round(total_value * 0.79, 2),

        round(total_value * 0.86, 2),

        round(total_value * 0.93, 2),

        round(total_value, 2)

    ]

    return {

        "labels": labels,

        "values": values

    }