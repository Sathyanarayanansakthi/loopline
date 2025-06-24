from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum

class SentimentEnum(str, Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"

class FeedbackBase(BaseModel):
    strengths: str
    improvements: str
    sentiment: SentimentEnum

class FeedbackCreate(FeedbackBase):
    employee_email: EmailStr

class FeedbackUpdate(FeedbackBase):
    pass

class FeedbackOut(FeedbackBase):
    id: int
    manager_email: EmailStr
    employee_email: EmailStr
    timestamp: datetime
    acknowledged: bool

    class Config:
        orm_mode = True
