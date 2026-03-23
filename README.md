# 🧠 SmartInbox

Sistema inteligente de classificação de e-mails com geração automática de respostas utilizando IA.

## 🚀 Sobre o projeto

O SmartInbox automatiza a análise de e-mails corporativos, classificando-os como produtivos ou improdutivos e sugerindo respostas automáticas.

## 🛠️ Tecnologias

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- axios

### Backend
- FastAPI
- spaCy (NLP)
- pdfplumber
- Google Gemini

## 🌐 Deploy

Frontend: https://smartinbox-gabrieldomingoss-projects.vercel.app/
Backend: https://smartinbox-api.onrender.com/

## ▶️ Rodar localmente

### Backend
cd backend  
pip install -r requirements.txt  
python -m spacy download pt_core_news_sm  
uvicorn app.main:app --reload  

### Frontend
cd frontend  
npm install  
npm run dev  

## ⚠️ Observação

O backend pode apresentar delay inicial (cold start) por estar em plano gratuito.
