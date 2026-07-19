from pydantic import BaseModel

class WatchlistItem(BaseModel):
    email: str
    symbol: str