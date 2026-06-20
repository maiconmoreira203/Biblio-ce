# biblio-ce

Projeto adaptado a partir da metodologia indicada. Backend em FastAPI (Python) e frontend em React + Vite.

Este repositório contém uma versão inicial com:
- Autenticação (registro/login) com JWT
- CRUD básico de livros
- Página com Relógios (abas separadas por fuso horário) no frontend
- Dockerfiles e docker-compose para desenvolvimento

Instruções rápidas (desenvolvimento local):

Backend
1. cd backend
2. python -m venv .venv
3. source .venv/bin/activate  # Linux/macOS
   .venv\Scripts\activate     # Windows
4. pip install -r requirements.txt
5. export SECRET_KEY="uma-chave-secreta"
6. uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Frontend
1. cd frontend
2. npm install
3. npm run dev

Docker (opcional)
1. docker-compose up --build

Todos os textos e mensagens estão em Português (PT-BR) onde aplicável.
