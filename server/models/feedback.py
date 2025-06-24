from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import enum

class SentimentEnum(str, enum.Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    manager_email = Column(String, ForeignKey("users.email"))
    employee_email = Column(String, ForeignKey("users.email"))
    strengths = Column(Text)
    improvements = Column(Text)
    sentiment = Column(Enum(SentimentEnum), default=SentimentEnum.neutral)
    timestamp = Column(DateTime, default=datetime.utcnow)
    acknowledged = Column(Boolean, default=False)

    manager = relationship("User", foreign_keys=[manager_email], backref="given_feedback")
    employee = relationship("User", foreign_keys=[employee_email], backref="received_feedback")
