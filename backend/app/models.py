from sqlmodel import Field, SQLModel, create_engine, Session
from typing import Optional

sqlite_url = "sqlite:///./biblio_ce.db"
engine = create_engine(sqlite_url, echo=False)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# modelos
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str
    hashed_password: str
    full_name: Optional[str] = None

class Book(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    author: Optional[str] = None
    available: bool = True
