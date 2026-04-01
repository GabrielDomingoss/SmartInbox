from fastapi import APIRouter, File, HTTPException, UploadFile, Request, Depends
from app.schemas.analyze import AnalyzeTextRequest, AnalyzeResponse
from app.services.ai_service import analyze_email_with_ai
from app.services.file_service import extract_text_from_uploaded_file
from app.services.nlp_service import preprocess_text
from app.core.limiter import limiter
from app.core.security import validate_origin
import logging

router = APIRouter()
MAX_TEXT_LENGTH = 2000
logger = logging.getLogger(__name__)


@router.post("/analyze", response_model=AnalyzeResponse)
@limiter.limit("5/minute; 10/day")
def analyze_email(
    request: Request,
    payload: AnalyzeTextRequest,
    _: None = Depends(validate_origin)
):
    logger.info("Recebendo requisição de análise de email por texto")
    content = payload.content.strip()

    if not content:
        logger.warning("Conteúdo vazio recebido")
        raise HTTPException(
            status_code=400,
            detail="O conteúdo do email não pode estar vazio."
        )
    
    if len(content.strip()) < 10:
        logger.warning("Conteúdo muito curto")
        raise HTTPException(
            status_code=400,
            detail="Conteúdo muito curto para análise."
        )
    
    if len(content) > MAX_TEXT_LENGTH:
        content = content[:MAX_TEXT_LENGTH]
    
    nlp_data = preprocess_text(content)

    logger.info("Chamando serviço de IA")
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
@limiter.limit("5/minute; 10/day")
async def analyze_email_file(
    request: Request,
    file: UploadFile = File(...),
    _: None = Depends(validate_origin)
):
    logger.info("Recebendo requisição de análise de email por arquivo")
    if not file.filename:
        logger.info("Nenhum arquivo recebido")
        raise HTTPException(
            status_code=400,
            detail="Nenhum arquivo foi enviado."
        )
    
    content = await extract_text_from_uploaded_file(file)
    if len(content) > 2000:
        content = content[:2000]

    if not content.strip():
        raise HTTPException(
            status_code=400,
            detail="Não foi possível extrair conteúdo do arquivo enviado."
        )

    nlp_data = preprocess_text(content)

    logger.info("Chamando serviço de IA")
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
