from database.mongodb import portfolio
from services.market_service import get_live_price


def dashboard_summary(email):

    stocks = list(
        portfolio.find(
            {"email": email},
            {"_id": 0}
        )
    )

    total_investment = 0
    current_value = 0

    top_gainer = None
    top_loser = None

    highest_profit = -999999999
    lowest_profit = 999999999

    for stock in stocks:

        live = get_live_price(stock["symbol"])

        if live is None:
            live = stock["buy_price"]

        investment = stock["buy_price"] * stock["quantity"]
        value = live * stock["quantity"]
        profit = value - investment

        total_investment += investment
        current_value += value

        if profit > highest_profit:
            highest_profit = profit
            top_gainer = stock["symbol"]

        if profit < lowest_profit:
            lowest_profit = profit
            top_loser = stock["symbol"]

    overall_profit = current_value - total_investment

    return_percent = 0

    if total_investment > 0:
        return_percent = round(
            overall_profit /
            total_investment *
            100,
            2
        )

    return {

        "investment": round(total_investment,2),

        "current_value": round(current_value,2),

        "overall_profit": round(overall_profit,2),

        "overall_return": return_percent,

        "top_gainer": top_gainer,

        "top_loser": top_loser

    }