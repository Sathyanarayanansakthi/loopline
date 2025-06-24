from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from database import get_db
from models.feedback import Feedback
from schema.feedback import FeedbackCreate, FeedbackUpdate, FeedbackOut
from fastapi.security import OAuth2PasswordBearer
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"email": payload.get("sub"), "role": payload.get("role")}
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

@router.post("/", response_model=FeedbackOut)
def submit_feedback(data: FeedbackCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    if user["role"] != "manager":
        raise HTTPException(status_code=403, detail="Only managers can submit feedback.")
    feedback = Feedback(
        manager_email=user["email"],
        employee_email=data.employee_email,
        strengths=data.strengths,
        improvements=data.improvements,
        sentiment=data.sentiment,
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback

@router.get("/received", response_model=list[FeedbackOut])
def get_received_feedback(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    if user["role"] != "employee":
        raise HTTPException(status_code=403, detail="Only employees can view their feedback.")
    return db.query(Feedback).filter(Feedback.employee_email == user["email"]).order_by(Feedback.timestamp.desc()).all()

@router.get("/team", response_model=list[FeedbackOut])
def get_team_feedback(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    if user["role"] != "manager":
        raise HTTPException(status_code=403, detail="Only managers can view team feedback.")
    return db.query(Feedback).filter(Feedback.manager_email == user["email"]).order_by(Feedback.timestamp.desc()).all()

@router.put("/{feedback_id}", response_model=FeedbackOut)
def update_feedback(feedback_id: int, update_data: FeedbackUpdate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    feedback = db.query(Feedback).filter_by(id=feedback_id, manager_email=user["email"]).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found or unauthorized")
    feedback.strengths = update_data.strengths
    feedback.improvements = update_data.improvements
    feedback.sentiment = update_data.sentiment
    db.commit()
    db.refresh(feedback)
    return feedback

@router.put("/acknowledge/{feedback_id}", response_model=FeedbackOut)
def acknowledge_feedback(feedback_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    feedback = db.query(Feedback).filter_by(id=feedback_id, employee_email=user["email"]).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found or unauthorized")
    feedback.acknowledged = True
    db.commit()
    db.refresh(feedback)
    return feedback
