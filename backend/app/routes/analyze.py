from fastapi import APIRouter, File, HTTPException, UploadFile
from app.schemas.analyze import AnalyzeTextRequest, AnalyzeResponse
from app.services.ai_service import analyze_email_with_ai
from app.services.file_service import extract_text_from_uploaded_file
from app.services.nlp_service import preprocess_text

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_email(payload: AnalyzeTextRequest):
    content = payload.content.strip()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="O conteúdo do email não pode estar vazio."
        )
    
    nlp_data = preprocess_text(content)

    result = analyze_email_with_ai(
        content=content,
        clean_text=nlp_data["clean_text"],
        keywords=nlp_data["keywords"]
    )

    return AnalyzeResponse(
        category=result["category"],
        reason=result["reason"],
        suggested_response=result["suggested_response"]
    )
    
@router.post("/analyze-file", response_model=AnalyzeResponse)
async def analyze_email_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Nenhum arquivo foi enviado."
        )
    
    content = await extract_text_from_uploaded_file(file)
    
    if not content.strip():
        raise HTTPException(
            status_code=400,
            detail="Não foi possível extrair conteúdo do arquivo enviado."
        )

    nlp_data = preprocess_text(content)

    result = analyze_email_with_ai(
        content=content,
        clean_text=nlp_data["clean_text"],
        keywords=nlp_data["keywords"]
    )

    return AnalyzeResponse(
        category=result["category"],
        reason=result["reason"],
        suggested_response=result["suggested_response"]
    )
