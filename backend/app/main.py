from fastapi import FastAPI
from .database import engine, create_db_and_tables
from .routers import auth, books

app = FastAPI(title="biblio-ce API (PT-BR)")

# Cria o DB (SQLite para a inicialização rápida)
create_db_and_tables()

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(books.router, prefix="/books", tags=["books"])

@app.get("/")
async def root():
    return {"mensagem": "API biblio-ce rodando"}
