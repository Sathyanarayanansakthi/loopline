from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import User, RoleEnum
from schema.schemas import UserCreate, UserLogin, Token
from database import get_db
from utils.utils import create_token, hash_password, verify_password

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    if user.manager_email:
        manager = db.query(User).filter(User.email == user.manager_email, User.role == "manager").first()
        if not manager:
            raise HTTPException(status_code=400, detail="Manager email not found")

    try:
        new_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hash_password(user.password),
            role=RoleEnum(user.role),
            manager_email=user.manager_email
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")

    return {"id": new_user.id, "username": new_user.username, "role": new_user.role}

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token({
        "sub": db_user.username,
        "role": db_user.role,
        "id": db_user.id
    })

    return {"access_token": token, "token_type": "bearer"}
