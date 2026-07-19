from fastapi import APIRouter

from services.notification_service import (
    get_notifications,
    mark_all_read
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get("/{email}")
def fetch_notifications(email: str):

    return get_notifications(email)


@router.put("/read/{email}")
def read_notifications(email: str):

    return mark_all_read(email)