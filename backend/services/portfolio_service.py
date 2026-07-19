from database.mongodb import portfolio, users
from services.market_service import get_live_price
from services.transaction_service import save_transaction


def update_level(email):

    user = users.find_one({"email": email})

    xp = user.get("experience", 0)

    if xp >= 500:
        level = "Expert"
    elif xp >= 250:
        level = "Advanced"
    elif xp >= 100:
        level = "Intermediate"
    else:
        level = "Beginner"

    users.update_one(
        {"email": email},
        {
            "$set": {
                "level": level
            }
        }
    )


def buy_stock(item):

    user = users.find_one({"email": item.email})

    if not user:
        return {
            "success": False,
            "message": "User not found."
        }

    wallet = user.get("wallet", 5000)

    total_cost = item.buy_price * item.quantity

    if wallet < total_cost:
        return {
            "success": False,
            "message": "Insufficient Wallet Balance"
        }

    existing = portfolio.find_one({
        "email": item.email,
        "symbol": item.symbol
    })

    if existing:

        new_qty = existing["quantity"] + item.quantity

        avg_price = (
            (existing["buy_price"] * existing["quantity"])
            + (item.buy_price * item.quantity)
        ) / new_qty

        portfolio.update_one(
            {
                "email": item.email,
                "symbol": item.symbol
            },
            {
                "$set": {
                    "quantity": new_qty,
                    "buy_price": round(avg_price, 2)
                }
            }
        )

    else:

        portfolio.insert_one({
            "email": item.email,
            "symbol": item.symbol,
            "quantity": item.quantity,
            "buy_price": item.buy_price
        })

    save_transaction(
        item.email,
        item.symbol,
        item.quantity,
        item.buy_price,
        "BUY"
    )

    users.update_one(
        {"email": item.email},
        {
            "$inc": {
                "experience": 10
            },
            "$set": {
                "wallet": wallet - total_cost
            }
        }
    )

    update_level(item.email)

    return {
        "success": True,
        "message": "Stock Purchased Successfully"
    }


def sell_stock(item):

    stock = portfolio.find_one({
        "email": item.email,
        "symbol": item.symbol
    })

    if not stock:
        return {
            "success": False,
            "message": "Stock not found."
        }

    if stock["quantity"] < item.quantity:
        return {
            "success": False,
            "message": "Not enough quantity."
        }

    total_amount = item.buy_price * item.quantity

    user = users.find_one({"email": item.email})

    wallet = user.get("wallet", 5000)

    users.update_one(
        {"email": item.email},
        {
            "$set": {
                "wallet": wallet + total_amount
            },
            "$inc": {
                "experience": 5
            }
        }
    )

    remaining = stock["quantity"] - item.quantity

    if remaining == 0:

        portfolio.delete_one({
            "email": item.email,
            "symbol": item.symbol
        })

    else:

        portfolio.update_one(
            {
                "email": item.email,
                "symbol": item.symbol
            },
            {
                "$set": {
                    "quantity": remaining
                }
            }
        )

    save_transaction(
        item.email,
        item.symbol,
        item.quantity,
        item.buy_price,
        "SELL"
    )

    update_level(item.email)

    return {
        "success": True,
        "message": "Stock Sold Successfully"
    }


def get_portfolio(email):

    stocks = list(
        portfolio.find(
            {"email": email},
            {"_id": 0}
        )
    )

    result = []

    for stock in stocks:

        current_price = get_live_price(stock["symbol"])

        if current_price is None:
            current_price = stock["buy_price"]

        investment = stock["buy_price"] * stock["quantity"]

        current_value = current_price * stock["quantity"]

        profit = current_value - investment

        profit_percent = 0

        if investment > 0:
            profit_percent = round(
                (profit / investment) * 100,
                2
            )

        stock["current_price"] = round(current_price, 2)
        stock["investment"] = round(investment, 2)
        stock["current_value"] = round(current_value, 2)
        stock["profit"] = round(profit, 2)
        stock["profit_percent"] = profit_percent

        result.append(stock)

    return result