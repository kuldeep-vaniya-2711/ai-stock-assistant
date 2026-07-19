from services.portfolio_service import get_portfolio


def get_allocation(email):

    portfolio = get_portfolio(email)

    allocation = []

    for stock in portfolio:

        allocation.append({

            "symbol": stock["symbol"],

            "value": stock["current_value"]

        })

    return allocation