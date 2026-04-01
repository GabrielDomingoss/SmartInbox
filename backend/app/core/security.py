from fastapi import Request, HTTPException

def validate_origin(request: Request):
    origin = request.headers.get("origin")

    if origin is None:
        return

    allowed = [
        "http://localhost:5173",
        "https://smartinbox-gabrieldomingoss-projects.vercel.app/"
    ]

    if origin not in allowed:
        raise HTTPException(403, "Forbidden")