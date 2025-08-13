import {Response, Request} from "express";
import {Book, BookDto} from "../model/Book.js";
import {convertBookDtoToBook, getGenre} from "../utils/tools.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {libServiceEmbedded} from "../services/libServiceImplEmbedded.js";

export const getBooksByGenre = (req:Request, res:Response) => {
    const {genre} = req.query;
    const genre_upd = getGenre(genre as string);
    const result = libServiceEmbedded.getBooksByGenre(genre_upd);
    res.json(result);
};


export const returnBook = (req:Request, res:Response) => {
    const {id} = req.query;
    libServiceEmbedded.returnBook(id as string);
    res.send("Book returned")
};


export const pickUpBook = (req:Request, res:Response) => {
    const {id, reader} = req.query;
    libServiceEmbedded.pickUpBook(id as string, reader as string);
    res.send(`Book picked by ${reader}`)
};


export const addBook = (req:Request, res:Response) => {
    const dto = req.body as BookDto;
    const book:Book = convertBookDtoToBook(dto);
    const result = libServiceEmbedded.addBook(book);
    if(result)
        res.status(201).json(book)
    else throw new HttpError(409, 'Book not added. Id conflict')
};

export const getAllBooks =(req:Request, res:Response) =>{
    const result = libServiceEmbedded.getAllBooks();
    res.json(result);
};

export const removeBook = (req:Request, res:Response) =>{
    const {id} = req.query;
    const result = libServiceEmbedded.removeBook(id as string);
    res.json(result);
};