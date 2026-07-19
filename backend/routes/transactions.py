from fastapi import APIRouter
from services.transaction_service import get_transactions

router = APIRouter()

@router.get("/transactions/{email}")
def transactions(email: str):
    return get_transactions(email)