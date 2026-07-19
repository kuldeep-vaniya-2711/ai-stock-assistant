from database.mongodb import portfolio
from services.market_service import get_live_price


def get_portfolio_summary(email):

    stocks = list(
        portfolio.find(
            {"email": email},
            {"_id": 0}
        )
    )

    total_investment = 0
    current_value = 0
    total_profit = 0

    for stock in stocks:

        buy_price = stock["buy_price"]

        quantity = stock["quantity"]

        investment = buy_price * quantity

        live_price = get_live_price(stock["symbol"])

        if live_price is None:
            live_price = buy_price

        value = live_price * quantity

        total_investment += investment

        current_value += value

        total_profit = current_value - total_investment

    return_percent = 0

    if total_investment > 0:

        return_percent = round(
            (total_profit / total_investment) * 100,
            2
        )

    # Risk Score
    stock_count = len(stocks)

    if stock_count == 0:

        risk = "No Portfolio"

    elif stock_count == 1:

        risk = "High"

    elif stock_count <= 3:

        risk = "Medium"

    else:

        risk = "Low"

    # AI Suggestion
    if stock_count == 0:

        suggestion = (
            "Start investing to build your portfolio."
        )

    elif risk == "High":

        suggestion = (
            "Your portfolio is highly concentrated. "
            "Consider diversifying across multiple stocks."
        )

    elif risk == "Medium":

        suggestion = (
            "Portfolio looks balanced, but adding stocks "
            "from different sectors can further reduce risk."
        )

    else:

        suggestion = (
            "Well diversified portfolio. Keep monitoring "
            "performance and rebalance periodically."
        )

    return {

        "total_investment": round(total_investment, 2),

        "current_value": round(current_value, 2),

        "profit_loss": round(total_profit, 2),

        "return_percent": return_percent,

        "risk": risk,

        "stock_count": stock_count,

        "ai_suggestion": suggestion,

    }