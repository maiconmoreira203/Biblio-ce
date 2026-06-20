from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from ..models import Book
from ..database import engine
from pydantic import BaseModel

router = APIRouter()

class BookIn(BaseModel):
    title: str
    author: str | None = None

@router.get('/')
def list_books():
    with Session(engine) as session:
        books = session.exec(select(Book)).all()
        return books

@router.post('/')
def create_book(payload: BookIn):
    with Session(engine) as session:
        book = Book(title=payload.title, author=payload.author)
        session.add(book)
        session.commit()
        session.refresh(book)
        return book

@router.put('/{book_id}')
def update_book(book_id: int, payload: BookIn):
    with Session(engine) as session:
        book = session.get(Book, book_id)
        if not book:
            raise HTTPException(status_code=404, detail='Livro não encontrado')
        book.title = payload.title
        book.author = payload.author
        session.add(book)
        session.commit()
        session.refresh(book)
        return book

@router.delete('/{book_id}')
def delete_book(book_id: int):
    with Session(engine) as session:
        book = session.get(Book, book_id)
        if not book:
            raise HTTPException(status_code=404, detail='Livro não encontrado')
        session.delete(book)
        session.commit()
        return {"mensagem": "Removido"}
