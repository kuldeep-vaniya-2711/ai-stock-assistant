from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from database.mongodb import users

from utils.security import (
    SECRET_KEY,
    ALGORITHM
)


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    credentials_exception = HTTPException(

        status_code=status.HTTP_401_UNAUTHORIZED,

        detail="Could not validate credentials",

        headers={
            "WWW-Authenticate": "Bearer"
        }

    )

    try:

        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )

        user_id = payload.get("sub")

        email = payload.get("email")

        if not user_id or not email:

            raise credentials_exception

    except JWTError:

        raise credentials_exception

    user = users.find_one({

        "email": email

    })

    if not user:

        raise credentials_exception

    return user