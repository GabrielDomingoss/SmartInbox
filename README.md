# SmartInbox

Sistema inteligente de classificação de e-mails com geração automática de respostas utilizando IA.

## Sobre o projeto

O SmartInbox automatiza a análise de e-mails corporativos, classificando-os como produtivos ou improdutivos e sugerindo respostas automáticas utilizando a IA Gemini.

## Tecnologias

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Axios

### Backend
- FastAPI (Python)
- spaCy (NLP)
- pdfplumber
- Google Gemini

## Deploy

- Frontend: https://smartinbox-gabrieldomingoss-projects.vercel.app
- Backend: https://smartinbox-api.onrender.com/

## Rodar localmente

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

python -m spacy download pt_core_news_sm  
pip install -r requirements.txt
```

Crie um arquivo `.env`:

```env
GEMINI_API_KEY=api_key_do_google (é possível gerar https://aistudio.google.com/app/api-keys)
FRONTEND_ORIGINS=http://localhost:5173
```

Rodar o servidor:

```bash
uvicorn app.main:app --reload
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

--- 

## ⚙️ Funcionalidades

- Upload de mensagens/arquivos
- Integração com IA para geração de respostas
- API REST para comunicação frontend/backend
- Tratamento de erros (ex: 429 - rate limit)
- Sistema de histórico de conversas (em evolução)

---

## Variáveis de Ambiente

| Variável | Descrição |
|--------|----------|
| GEMINI_API_KEY | Chave da API do Gemini |
| FRONTEND_ORIGINS | URLs permitidas no CORS |

---

## Estrutura do Projeto

```
smartinbox/
├── backend/
├ ├ app/
├ ├ ├ core/
├ ├ ├ core/
├ ├ ├ routes/
├ ├ ├ schemas/
├ ├ ├ services/
├── frontend/
├ ├ public/
├ ├ src/
├ ├ ├ components/
├ ├ ├ hooks/
├ ├ ├ lib/
├ ├ ├ services/
├ ├ ├ types/
└── README.md
```

---

## Observação

O backend pode apresentar delay inicial (cold start) por estar em plano gratuito do Render.


## Autor

Gabriel Domingos  
Desenvolvedor de Software