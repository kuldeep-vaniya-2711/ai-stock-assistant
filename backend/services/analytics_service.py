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

    investment = sum(stock["investment"] for stock in portfolio)
    current_value = sum(stock["current_value"] for stock in portfolio)

    overall_profit = current_value - investment

    overall_return = 0

    if investment > 0:
        overall_return = round(
            (overall_profit / investment) * 100,
            2
        )

    # -----------------------------
    # Best / Worst Stock
    # -----------------------------
    best = max(portfolio, key=lambda x: x["profit"])
    worst = min(portfolio, key=lambda x: x["profit"])

    # -----------------------------
    # Diversification
    # -----------------------------
    weights = []

    for stock in portfolio:

        weight = (stock["investment"] / investment) * 100

        weights.append(weight)

    max_weight = max(weights)

    diversification = round(
        100 - max_weight,
        2
    )

    if diversification < 30:
        diversification = 30

    # -----------------------------
    # Risk Calculation
    # -----------------------------
    if max_weight >= 60:

        risk = "High"

    elif max_weight >= 35:

        risk = "Medium"

    else:

        risk = "Low"

    # -----------------------------
    # Health Score
    # -----------------------------
    health_score = 50

    # Profit

    if overall_return > 20:

        health_score += 20

    elif overall_return > 10:

        health_score += 15

    elif overall_return > 0:

        health_score += 10

    # Diversification

    if diversification > 70:

        health_score += 20

    elif diversification > 50:

        health_score += 15

    else:

        health_score += 5

    # Risk

    if risk == "Low":

        health_score += 10

    elif risk == "Medium":

        health_score += 5

    health_score = min(100, round(health_score))

    # -----------------------------
    # AI Recommendation
    # -----------------------------
    if overall_return < 0:

        recommendation = (
            "Portfolio is in loss. Avoid panic selling "
            "and review weak stocks."
        )

    elif risk == "High":

        recommendation = (
            "Portfolio is highly concentrated. "
            "Diversify into more sectors."
        )

    elif health_score >= 90:

        recommendation = (
            "Excellent Portfolio. Continue SIP and "
            "hold quality stocks."
        )

    elif health_score >= 75:

        recommendation = (
            "Healthy Portfolio. Small diversification "
            "can improve stability."
        )

    else:

        recommendation = (
            "Review portfolio allocation and rebalance."
        )

    return {

        "investment": round(investment, 2),

        "current_value": round(current_value, 2),

        "overall_profit": round(overall_profit, 2),

        "overall_return": overall_return,

        "portfolio_return": overall_return,

        "best_stock": best["symbol"],

        "worst_stock": worst["symbol"],

        "risk": risk,

        "diversification": diversification,

        "health_score": health_score,

        "recommendation": recommendation

    }