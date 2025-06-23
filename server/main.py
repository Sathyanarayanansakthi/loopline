from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

from database import Base, engine, get_db
from models.models import User
from auth import router as auth_router

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(auth_router, prefix="/auth")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@app.get("/team")
def get_team(current_token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(current_token, SECRET_KEY, algorithms=[ALGORITHM])
        role = payload.get("role")
        user_id = payload.get("id")

        if role != "manager":
            raise HTTPException(status_code=403, detail="Only managers can view their team")

        team = db.query(User).filter(User.manager_email == payload.get("sub")).all()
        return [{"id": u.id, "username": u.username, "email": u.email} for u in team]

    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")
