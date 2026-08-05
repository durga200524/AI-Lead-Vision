from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.auth.users import fake_users_db
from app.auth.security import verify_password
from app.auth.jwt_handler import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(data: LoginRequest):

    user = fake_users_db.get(data.username)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not verify_password(
        data.password,
        user["hashed_password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        {
            "sub": user["username"],
            "role": user["role"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "username": user["username"],
            "full_name": user["full_name"],
            "email": user["email"],
            "role": user["role"]
        }
    }