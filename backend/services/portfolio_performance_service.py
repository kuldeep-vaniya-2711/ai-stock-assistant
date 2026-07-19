from database.mongodb import portfolio
from services.market_service import get_live_price


def get_portfolio_performance(email: str):

    stocks = list(
        portfolio.find(
            {"email": email},
            {"_id": 0}
        )
    )

    if not stocks:

        return {
            "best_stock": "-",
            "best_return": 0,
            "worst_stock": "-",
            "worst_return": 0,
            "investment": 0,
            "current_value": 0
        }

    best_stock = "-"
    worst_stock = "-"

    best_return = -999999
    worst_return = 999999

    total_investment = 0
    total_current = 0

    for stock in stocks:

        live_price = get_live_price(
            stock["symbol"]
        )

        if live_price is None:
            continue

        investment = (
            stock["buy_price"] *
            stock["quantity"]
        )

        current_value = (
            live_price *
            stock["quantity"]
        )

        total_investment += investment
        total_current += current_value

        profit = current_value - investment

        percent = (
            profit / investment
        ) * 100

        if percent > best_return:

            best_return = percent
            best_stock = stock["symbol"]

        if percent < worst_return:

            worst_return = percent
            worst_stock = stock["symbol"]

    return {

        "investment": round(
            total_investment,
            2
        ),

        "current_value": round(
            total_current,
            2
        ),

        "best_stock": best_stock,

        "best_return": round(
            best_return,
            2
        ),

        "worst_stock": worst_stock,

        "worst_return": round(
            worst_return,
            2
        )

    }