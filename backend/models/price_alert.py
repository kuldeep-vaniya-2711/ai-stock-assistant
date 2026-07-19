from pydantic import BaseModel


class PriceAlert(BaseModel):
    email: str
    symbol: str
    target_price: float
    condition: str