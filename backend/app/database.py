from sqlmodel import create_engine

sqlite_url = "sqlite:///./biblio_ce.db"
engine = create_engine(sqlite_url, echo=False)

def create_db_and_tables():
    from .models import SQLModel
    # Importa os modelos para registrar no metadata
    from .models import User, Book
    SQLModel.metadata.create_all(engine)
