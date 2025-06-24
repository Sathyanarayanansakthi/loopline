from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from auth import router as auth_router
from routes.feedback import router as feedback_router
import os

from database import Base, engine, get_db
from models.models import User
from auth import router as auth_router

# Load environment variables
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include auth routes
app.include_router(auth_router, prefix="/auth")
app.include_router(feedback_router, prefix="/feedback") 

# OAuth2 token scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Manager-only endpoint to fetch their team members
@app.get("/team")
def get_team(current_token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        # Decode JWT
        payload = jwt.decode(current_token, SECRET_KEY, algorithms=[ALGORITHM])
        role = payload.get("role")
        email = payload.get("sub")  # sub = email (we're using it as unique identifier)

        if role != "manager":
            raise HTTPException(status_code=403, detail="Only managers can view their team")

        # Query users who have this manager_email
        team = db.query(User).filter(User.manager_email == email).all()

        return [
            {
                "id": u.id,
                "username": u.username,
                "email": u.email
            }
            for u in team
        ]

    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")
