from services.portfolio_service import get_portfolio


def get_ai_recommendation(email):

    portfolio = get_portfolio(email)

    if not portfolio:

        return {
            "score": 0,
            "title": "Start Investing",
            "status": "info",
            "best_stock": "-",
            "worst_stock": "-",
            "risk": "Low",
            "diversification": "Poor",
            "profit": 0,
            "market_trend": "Neutral",
            "buy_score": 0,
            "confidence": 0,
            "next_week": "Neutral",
            "expected_growth": 0,
            "suggestions": [
                "Buy your first stock.",
                "Create a diversified portfolio.",
                "Start SIP investing.",
                "Track your watchlist.",
                "Avoid emotional investing."
            ]
        }

    investment = sum(
        stock["investment"]
        for stock in portfolio
    )

    total_profit = sum(
        stock["profit"]
        for stock in portfolio
    )

    best = max(
        portfolio,
        key=lambda x: x["profit"]
    )

    worst = min(
        portfolio,
        key=lambda x: x["profit"]
    )

    # ---------------------------------------
    # Diversification
    # ---------------------------------------

    weights = []

    for stock in portfolio:

        weight = (
            stock["investment"] /
            investment
        ) * 100

        weights.append(weight)

    max_weight = max(weights)

    diversification = round(
        100 - max_weight,
        2
    )

    if diversification < 30:
        diversification = 30

    if diversification >= 80:

        diversification_text = "Excellent"

    elif diversification >= 60:

        diversification_text = "Good"

    elif diversification >= 40:

        diversification_text = "Average"

    else:

        diversification_text = "Poor"

    # ---------------------------------------
    # Risk
    # ---------------------------------------

    if max_weight >= 60:

        risk = "High"

    elif max_weight >= 35:

        risk = "Medium"

    else:

        risk = "Low"

    # ---------------------------------------
    # Portfolio Score
    # ---------------------------------------

    score = 40

    score += diversification / 4

    if total_profit > 0:
        score += 15

    if total_profit > 5000:
        score += 10

    if total_profit > 10000:
        score += 10

    if worst["profit_percent"] < -15:
        score -= 20

    score = round(
        max(
            0,
            min(score, 100)
        )
    )

    # ---------------------------------------
    # Status
    # ---------------------------------------

    if score >= 90:

        title = "Excellent Portfolio"

        status = "success"

    elif score >= 75:

        title = "Healthy Portfolio"

        status = "success"

    elif score >= 55:

        title = "Portfolio Stable"

        status = "warning"

    else:

        title = "Portfolio Needs Improvement"

        status = "danger"

    # ---------------------------------------
    # Market Trend
    # ---------------------------------------

    positive = len(
        [
            s
            for s in portfolio
            if s["profit"] > 0
        ]
    )

    negative = len(portfolio) - positive

    if positive > negative:

        market_trend = "Bullish"

    elif positive == negative:

        market_trend = "Neutral"

    else:

        market_trend = "Bearish"

    # ---------------------------------------
    # Buy Score
    # ---------------------------------------

    buy_score = round(

        (score * 0.6)

        +

        (diversification * 0.4)

    )

    buy_score = min(100, buy_score)

    # ---------------------------------------
    # Confidence
    # ---------------------------------------

    confidence = round(

        60 +

        (buy_score / 2)

    )

    confidence = min(98, confidence)

    # ---------------------------------------
    # Prediction
    # ---------------------------------------

    if total_profit > 0 and risk == "Low":

        next_week = "Bullish"

    elif risk == "High":

        next_week = "Volatile"

    else:

        next_week = "Neutral"

    expected_growth = round(

        max(
            1,
            buy_score / 18
        ),

        1

    )

    # ---------------------------------------
    # Suggestions
    # ---------------------------------------

    suggestions = []

    if diversification < 60:

        suggestions.append(
            "Diversify into IT, Pharma and FMCG sectors."
        )

    if risk == "High":

        suggestions.append(
            "Reduce concentration in one stock."
        )

    if total_profit > 10000:

        suggestions.append(
            "Book partial profits and rebalance."
        )

    if worst["profit_percent"] < -10:

        suggestions.append(
            f"Review {worst['symbol']} fundamentals."
        )

    suggestions.append(
        "Continue monthly SIP investing."
    )

    suggestions.append(
        "Keep 10% cash for market opportunities."
    )

    suggestions.append(
        "Review portfolio every weekend."
    )

    return {

        "score": score,

        "title": title,

        "status": status,

        "profit": round(total_profit, 2),

        "risk": risk,

        "best_stock": best["symbol"],

        "worst_stock": worst["symbol"],

        "diversification": diversification_text,

        "market_trend": market_trend,

        "buy_score": buy_score,

        "confidence": confidence,

        "next_week": next_week,

        "expected_growth": expected_growth,

        "suggestions": suggestions

    }