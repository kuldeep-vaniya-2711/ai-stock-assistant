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

    result = {}

    for stock in stocks:

        # Agar sector save nahi hai to Other
        sector = stock.get("sector", "Other")

        value = stock.get("buy_price", 0) * stock.get("quantity", 0)

        result[sector] = result.get(sector, 0) + value

    return [
        {
            "name": key,
            "value": value
        }
        for key, value in result.items()
    ]