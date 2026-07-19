from services.analytics_service import get_ai_insights


def get_ai_reply(email, message):

    message = message.lower()

    analytics = get_ai_insights(email)

    if "portfolio" in message:

        return (

            f"Your portfolio return is ₹{analytics['portfolio_return']}.\n"

            f"Risk Level : {analytics['risk']}.\n"

            f"Health Score : {analytics['health_score']}%."

        )

    elif "best" in message:

        return (

            f"Your best performing stock is "

            f"{analytics['best_stock']}."

        )

    elif "worst" in message:

        return (

            f"Your worst performing stock is "

            f"{analytics['worst_stock']}."

        )

    elif "risk" in message:

        return (

            f"Current portfolio risk is "

            f"{analytics['risk']}."

        )

    elif "buy" in message:

        return (

            "Consider buying fundamentally strong companies "

            "with positive AI recommendation."

        )

    elif "sell" in message:

        return (

            "Sell only if fundamentals weaken or "

            "your investment thesis changes."

        )

    elif "health" in message:

        return (

            f"Portfolio Health Score : "

            f"{analytics['health_score']}%."

        )

    else:

        return (

            "Ask me about:\n"

            "• Portfolio\n"

            "• Best Stock\n"

            "• Worst Stock\n"

            "• Risk\n"

            "• Buy\n"

            "• Sell\n"

            "• Health"

        )