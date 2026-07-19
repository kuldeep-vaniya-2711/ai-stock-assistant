from services.portfolio_service import get_portfolio


def get_ai_insights(email):

    portfolio = get_portfolio(email)

    if len(portfolio) == 0:

        return {

            "investment": 0,

            "current_value": 0,

            "overall_profit": 0,

            "overall_return": 0,

            "best_stock": "-",

            "worst_stock": "-",

            "portfolio_return": 0,

            "risk": "Low",

            "diversification": 0,

            "health_score": 0,

            "recommendation": "Your portfolio is empty."

        }

    investment = sum(

        stock["investment"]

        for stock in portfolio

    )

    current_value = sum(

        stock["current_value"]

        for stock in portfolio

    )

    overall_profit = current_value - investment

    overall_return = 0

    if investment > 0:

        overall_return = round(

            (overall_profit / investment) * 100,

            2

        )

    best = max(

        portfolio,

        key=lambda x: x["profit"]

    )

    worst = min(

        portfolio,

        key=lambda x: x["profit"]

    )

    diversification = min(

        len(portfolio) * 20,

        100

    )

    if diversification < 40:

        risk = "High"

    elif diversification < 70:

        risk = "Medium"

    else:

        risk = "Low"

    if diversification >= 80:

        recommendation = "Excellent diversified portfolio."

    elif diversification >= 60:

        recommendation = "Portfolio is well diversified."

    else:

        recommendation = "Consider adding more sectors."

    health_score = min(

        100,

        round(

            diversification * 0.6 +

            (

                40 if risk == "Low"

                else 25 if risk == "Medium"

                else 10

            )

        )

    )

    return {

        "investment": round(investment, 2),

        "current_value": round(current_value, 2),

        "overall_profit": round(overall_profit, 2),

        "overall_return": overall_return,

        "best_stock": best["symbol"],

        "worst_stock": worst["symbol"],

        "portfolio_return": round(overall_profit, 2),

        "risk": risk,

        "diversification": diversification,

        "health_score": health_score,

        "recommendation": recommendation

    }