from services.portfolio_service import get_portfolio


def get_rebalance_plan(email):

    portfolio = get_portfolio(email)

    if not portfolio:

        return {
            "portfolio_value": 0,
            "suggestions": [],
            "diversification_score": 0
        }

    total = sum(
        stock["current_value"]
        for stock in portfolio
    )

    suggestions = []

    largest_weight = 0

    for stock in portfolio:

        weight = round(
            stock["current_value"] / total * 100,
            2
        )

        largest_weight = max(
            largest_weight,
            weight
        )

        if weight > 35:

            excess = round(
                stock["current_value"] * 0.15,
                2
            )

            suggestions.append({

                "symbol": stock["symbol"],

                "action": "SELL",

                "amount": excess,

                "reason": "Stock allocation is too high."

            })

        elif weight < 10:

            buy = round(

                total * 0.05,

                2

            )

            suggestions.append({

                "symbol": stock["symbol"],

                "action": "BUY",

                "amount": buy,

                "reason": "Increase allocation."

            })

    diversification_score = round(

        100 - largest_weight,

        2

    )

    return {

        "portfolio_value": round(total, 2),

        "diversification_score": diversification_score,

        "suggestions": suggestions

    }