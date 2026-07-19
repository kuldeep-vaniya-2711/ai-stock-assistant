from pydantic import BaseModel


class TransactionItem(BaseModel):
    email: str
    symbol: str
    quantity: int
    price: float
    transaction_type: str