from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import Session, select
from ..models import User
from ..database import engine
from ..auth import get_password_hash, verify_password, create_access_token
from pydantic import BaseModel, EmailStr
from datetime import timedelta

router = APIRouter()

class RegisterIn(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post('/register')
def register(payload: RegisterIn):
    with Session(engine) as session:
        user_exists = session.exec(select(User).where(User.email == payload.email)).first()
        if user_exists:
            raise HTTPException(status_code=400, detail="E-mail já cadastrado")
        user = User(email=payload.email, hashed_password=get_password_hash(payload.password), full_name=payload.full_name)
        session.add(user)
        session.commit()
        session.refresh(user)
        return {"mensagem": "Registrado com sucesso"}

class LoginIn(BaseModel):
    email: EmailStr
    password: str

@router.post('/login', response_model=TokenOut)
def login(payload: LoginIn):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == payload.email)).first()
        if not user or not verify_password(payload.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Credenciais inválidas")
        access_token = create_access_token({"sub": user.email}, expires_delta=timedelta(hours=12))
        return {"access_token": access_token}
