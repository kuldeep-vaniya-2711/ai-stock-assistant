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

        "transaction_type": transaction_type,

        "quantity": int(quantity),

        "price": round(float(price), 2),

        "total": round(float(quantity) * float(price), 2),

        "date": datetime.now()

    })


def get_transactions(email):

    data = list(

        transactions.find(

            {"email": email},

            {"_id": 0}

        ).sort(

            "date",

            -1

        )

    )

    return data