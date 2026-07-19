from pydantic import BaseModel


class Notification(BaseModel):

    email: str

    title: str

    message: str