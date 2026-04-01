from io import BytesIO
import pdfplumber
from fastapi import HTTPException, UploadFile
import logging

MAX_FILE_SIZE = 1 * 1024 * 1024
MAX_PAGES = 10
logger = logging.getLogger(__name__)

def extract_text_from_txt(file_bytes: bytes) -> str:
    try:
        return file_bytes.decode("utf-8").strip()
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Não foi possível ler o arquivo TXT. Verifique a codificação do arquivo."
        )
    
def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        text_parts: list[str] = []
        
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:
            for i, page in enumerate(pdf.pages):
                if i >= MAX_PAGES:
                    logger.info(f"Limite de páginas atingido: {i}")
                    break

                page_text = page.extract_text() or ""
                if page_text.strip():
                    text_parts.append(page_text.strip())

        full_text = "\n".join(text_parts).strip()

        if not full_text:
            raise HTTPException(
                status_code=400,
                detail="Não foi possível extrair texto do PDF enviado."
            )
        
        return full_text
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Erro ao processar PDF: {str(e)}"
        )
    
async def extract_text_from_uploaded_file(file: UploadFile) -> str:
    file_bytes = await file.read(MAX_FILE_SIZE + 1)

    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Arquivo muito grande (máx 1MB)"
        )
    
    if file.content_type == "application/txt":
        return extract_text_from_txt(file_bytes)
    
    if file.content_type == "application/pdf":
        return extract_text_from_pdf(file_bytes)
    
    raise HTTPException(
        status_code=400,
        detail="Formato de arquivo não suportado. Envie um arquivo .txt ou .pdf."
    )