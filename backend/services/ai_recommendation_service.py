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

    total_profit = sum(

        stock.get("profit", 0)

        for stock in portfolio

    )

    best = max(

        portfolio,

        key=lambda x: x.get("profit", 0)

    )

    worst = min(

        portfolio,

        key=lambda x: x.get("profit", 0)

    )

    diversification = min(

        len(portfolio) * 10,

        100

    )

    if diversification >= 80:

        diversification_text = "Excellent"

    elif diversification >= 60:

        diversification_text = "Good"

    elif diversification >= 40:

        diversification_text = "Average"

    else:

        diversification_text = "Poor"

    score = 50

    score += diversification // 4

    if total_profit > 0:

        score += 20

    if total_profit > 5000:

        score += 10

    if worst.get("profit_percent", 0) < -10:

        score -= 15

    score = max(0, min(100, score))

    if score >= 85:

        title = "Excellent Portfolio"

        status = "success"

        risk = "Low"

    elif score >= 65:

        title = "Healthy Portfolio"

        status = "success"

        risk = "Medium"

    elif score >= 45:

        title = "Portfolio Stable"

        status = "warning"

        risk = "Medium"

    else:

        title = "Portfolio Needs Improvement"

        status = "danger"

        risk = "High"

    suggestions = []

    if diversification < 60:

        suggestions.append(

            "Diversify across more sectors."

        )

    if worst.get("profit_percent", 0) < -8:

        suggestions.append(

            f"Review {worst['symbol']} position."

        )

    if best.get("profit_percent", 0) > 20:

        suggestions.append(

            f"Book partial profit in {best['symbol']}."

        )

    if total_profit < 0:

        suggestions.append(

            "Avoid averaging losing stocks."

        )

    suggestions.append(

        "Continue monthly SIP."

    )

    suggestions.append(

        "Keep 10% cash for opportunities."

    )

    suggestions.append(

        "Review portfolio weekly."

    )

    market_trend = (

        "Bullish"

        if total_profit >= 0

        else "Bearish"

    )

    buy_score = min(

        100,

        score + 5

    )

    confidence = min(

        98,

        score + 8

    )

    next_week = (

        "Positive"

        if score >= 70

        else "Neutral"

    )

    expected_growth = round(

        max(2, score / 20),

        1

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