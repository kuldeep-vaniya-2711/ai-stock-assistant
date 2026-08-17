from fastapi import APIRouter

from services.transaction_service import get_transactions

router = APIRouter(

    prefix="/transactions",

    tags=["Transactions"]

)


@router.get("/{email}")
def transactions(email: str):

    return get_transactions(email)