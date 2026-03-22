from io import BytesIO
import pdfplumber
from fastapi import HTTPException, UploadFile

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
            for page in pdf.pages: 
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
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Ocorreu um erro ao processar o arquivo PDF."
        )
    
async def extract_text_from_uploaded_file(file: UploadFile) -> str:
    filename = file.filename or ""
    lower_name = filename.lower()

    file_bytes = await file.read()
    
    if lower_name.endswith(".txt"):
        return extract_text_from_txt(file_bytes)
    
    if lower_name.endswith(".pdf"):
        return extract_text_from_pdf(file_bytes)
    
    raise HTTPException(
        status_code=400,
        detail="Formato de arquivo não suportado. Envie um arquivo .txt ou .pdf."
    )