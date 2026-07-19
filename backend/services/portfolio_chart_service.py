from database.mongodb import transactions


def get_portfolio_growth(email: str):

    data = list(
        transactions.find(
            {"email": email},
            {
                "_id": 0,
                "date": 1,
                "price": 1,
                "quantity": 1,
                "transaction_type": 1
            }
        ).sort("date", 1)
    )

    growth = []

    total = 0

    for item in data:

        amount = item["price"] * item["quantity"]

        if item["transaction_type"] == "BUY":
            total += amount
        else:
            total -= amount

        growth.append({
            "date": item["date"].strftime("%d %b"),
            "investment": round(total, 2)
        })

    return growth