from database.mongodb import watchlist

def add_to_watchlist(item):
    existing = watchlist.find_one({
        "email": item.email,
        "symbol": item.symbol
    })

    if existing:
        return {
            "success": False,
            "message": "Stock already exists."
        }

    watchlist.insert_one({
        "email": item.email,
        "symbol": item.symbol
    })

    return {
        "success": True,
        "message": "Added to Watchlist"
    }


def get_watchlist(email):
    stocks = list(
        watchlist.find(
            {"email": email},
            {"_id": 0}
        )
    )

    return stocks

def remove_from_watchlist(email, symbol):

    result = watchlist.delete_one({
        "email": email,
        "symbol": symbol
    })

    if result.deleted_count == 0:
        return {
            "success": False,
            "message": "Stock not found."
        }

    return {
        "success": True,
        "message": "Removed Successfully"
    }