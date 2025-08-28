import {Response, Request} from "express";
import {Book, BookDto} from "../model/Book.js";
import {checkReaderId, convertBookDtoToBook, getGenre, getStatus} from "../utils/tools.js";
import {HttpError} from "../errorHandler/HttpError.js";
// import {libServiceEmbedded as service} from "../services/libServiceImplEmbedded.js";
import {libServiceMongo as service} from "../services/libServiceImplMongo.js";
import {AuthRequest} from "../utils/libTypes.js";
import {accountServiceMongo} from "../services/accountServiceImplMongo.js";
// import {libServiceSql as service} from "../services/libServiceImplSQL.js";

export const addBook = async (req: Request, res: Response) => {
    const dto = req.body as BookDto;
    const book: Book = convertBookDtoToBook(dto);

    const result = await service.addBook(book);
    if (result)
        res.status(201).send("Book successfully added");
    else throw new HttpError(409, 'Book not added. Id conflict')
};

export const getAllBooks =async (req: Request, res: Response) => {
    const result = await service.getAllBooks();
    res.json(result);
};

export const getBooksByGenre = async (req: Request, res: Response) => {
    const {genre} = req.query;
    const genre_upd = getGenre(genre as string);
    const result = await service.getBooksByGenre(genre_upd);
    res.json(result);
};

export const pickUpBook = async (req: AuthRequest, res: Response) => {
    const {id, readerId} = req.query;
    const readerIdParam = checkReaderId(readerId as string);
    const reader = await accountServiceMongo.getAccountById(readerIdParam);
    if(!reader)
        res.status(404).send("Reader not found")

    await service.pickUpBook(id as string, reader._id);
    res.send(`Book picked by ${readerId}`)
};

export const removeBook = async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await service.removeBook(id as string);
    res.json(result);
};

export const returnBook = async (req: Request, res: Response) => {
    const {id} = req.query;
    await service.returnBook(id as string);
    res.send("Book returned")
};

export const getBooksByGenreAndStatus = async (req: Request, res: Response)=>{
    const {genre, status} = req.query;
    const genre_upd = getGenre(genre as string);
    const status_upd = getStatus(status as string);
    const result = await service.getBooksByGenreAndStatus(genre_upd, status_upd);
    res.json(result);
};

export const getBooksPickedUpByReader = async (req: Request, res: Response) =>{
    const {id} = req.query;
    const readerIdParam = checkReaderId(id as string);
    const reader = await accountServiceMongo.getAccountById(readerIdParam);
    if(!reader)
        res.status(404).send("Reader not found");
    const result = await service.getBooksPickedUpByReader(reader._id);
    res.json(result)
}
