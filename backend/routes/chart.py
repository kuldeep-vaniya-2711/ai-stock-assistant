from fastapi import APIRouter
from database.mongodb import portfolio

router = APIRouter(
    prefix="/chart",
    tags=["Charts"]
)


@router.get("/sector-allocation/{email}")
def sector_allocation(email: str):

    stocks = list(
        portfolio.find(
            {"email": email},
            {"_id": 0}
        )
    )

    allocation = {}

    for stock in stocks:

        sector = stock.get("sector", "Other")

        quantity = stock.get("quantity", 0)

        buy_price = stock.get("buy_price", 0)

        value = round(quantity * buy_price, 2)

        allocation[sector] = allocation.get(sector, 0) + value

    return [

        {
            "name": sector,
            "value": round(value, 2)
        }

        for sector, value in allocation.items()

    ]