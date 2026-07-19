from fastapi import APIRouter
from pydantic import BaseModel

from services.ai_chat_service import get_ai_reply

router = APIRouter(
    prefix="/ai",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):
    email: str
    message: str


@router.post("/chat")
def ai_chat(data: ChatRequest):

    return {

        "reply": get_ai_reply(

            data.email,

            data.message

        )

    }