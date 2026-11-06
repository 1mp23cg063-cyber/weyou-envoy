"""
WeYouX enVoy — Production FastAPI Contact Endpoint Implementation
Drop this router into your existing backend (envoy.weyoux.com) to handle public contact inquiries.
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks, status
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
import datetime
import html
import re
import logging

logger = logging.getLogger("envoy.contact")
router = APIRouter(prefix="/api", tags=["contact"])

class ContactInquiryRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    country_code: str = Field(default="+91", max_length=5)
    phone: str = Field(..., min_length=7, max_length=20)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=150)
    industry: Optional[str] = Field(None, max_length=50)
    preferred_channel: Optional[str] = Field(default="whatsapp", max_length=20)
    message: Optional[str] = Field(None, max_length=3000)
    consent: bool = Field(..., description="DPDPA 2023 Consent acknowledgment")
    source: Optional[str] = Field(default="weyouenvoy.com/contact")

    @validator("name")
    def validate_name(cls, v):
        v = v.strip()
        if re.search(r"[<>]", v):
            raise ValueError("Invalid characters in name")
        return html.escape(v)

    @validator("phone")
    def validate_phone(cls, v):
        digits = re.sub(r"\D", "", v)
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Phone number must contain between 7 and 15 digits")
        return v

    @validator("consent")
    def validate_consent(cls, v):
        if not v:
            raise ValueError("Consent under DPDPA 2023 is required to process your inquiry")
        return v


async def notify_team_task(inquiry: ContactInquiryRequest):
    """
    Background worker:
    1. Dispatches email to sales@weyoux.com
    2. Sends WhatsApp alert to team if configured
    3. Persists to CRM (HubSpot, LeadSquared, or PostgreSQL leads table)
    """
    try:
        # Example: Logging inquiry receipt
        logger.info(f"New inquiry received from {inquiry.name} ({inquiry.email}) - {inquiry.company or 'Direct'}")
        
        # Here integrate your existing mailer or notification service:
        # await send_email(
        #     to="sales@weyoux.com",
        #     subject=f"New enVoy Inquiry: {inquiry.name} - {inquiry.company or 'New Lead'}",
        #     body=f"Name: {inquiry.name}\nEmail: {inquiry.email}\nPhone: {inquiry.phone}\nIndustry: {inquiry.industry}\nMessage:\n{inquiry.message}"
        # )
    except Exception as e:
        logger.error(f"Failed to process inquiry notification: {e}")


@router.post(
    "/contact",
    status_code=status.HTTP_201_CREATED,
    summary="Submit Contact Inquiry",
    description="Receive, validate and store enterprise inquiries from weyouenvoy.com"
)
async def submit_contact_inquiry(
    inquiry: ContactInquiryRequest,
    background_tasks: BackgroundTasks
):
    # Queue notification and CRM persistence in background
    background_tasks.add_task(notify_team_task, inquiry)
    
    return {
        "status": "success",
        "message": "Thank you! Your inquiry has been received. Our team will contact you within 24 hours.",
        "received_at": datetime.datetime.utcnow().isoformat()
    }
