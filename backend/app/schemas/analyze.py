from pydantic import BaseModel

class AnalyzeTextRequest(BaseModel):
    content: str

class AnalyzeResponse(BaseModel):
    category: str
    reason: str
    suggested_response: str