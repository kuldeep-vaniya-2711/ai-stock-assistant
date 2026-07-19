from datetime import datetime

from database.mongodb import db

transactions = db["transactions"]


def save_transaction(
    email,
    symbol,
    quantity,
    price,
    transaction_type
):

    transactions.insert_one({
        "email": email,
        "symbol": symbol,
        "type": transaction_type,
        "quantity": quantity,
        "price": price,
        "total": quantity * price,
        "date": datetime.now()
    })


def get_transactions(email):

    data = list(
        transactions.find(
            {"email": email},
            {"_id": 0}
        ).sort("date", -1)
    )

    return data