import {LibService} from "./libService.js";
import {Book, BookGenres, BookStatus} from "../model/Book.js";
import {BookMongooseModel} from "../model/BookMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class LibServiceImplMongo implements LibService{
    async addBook(book: Book): Promise<boolean> {
        const isExists = await BookMongooseModel.findById(book.id).exec();
        if(isExists)
            return Promise.resolve(false);

        // const newBook = new BookMongooseModel(book); // creating Document through Constructor
        // await newBook.save();

        const temp = await BookMongooseModel.create({ // creating Document manually
            _id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            status: book.status,
            pickList: book.pickList
        })
        if(!temp)
            return Promise.resolve(false);
        return Promise.resolve(true);
    }

    async getAllBooks(): Promise<Book[]> {
        const result = await BookMongooseModel.find().exec();
        return result as Book[];
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        const result = await BookMongooseModel.find({genre}).exec() as Book[]
        return Promise.resolve(result);
    }

    async pickUpBook(id: string, readerId: number): Promise<void> {
        const bookDoc = await BookMongooseModel.findById(id).exec();
        if(!bookDoc)
            throw new HttpError(404, `Book with id ${id} not found`);
        if(bookDoc.status !== BookStatus.ON_STOCK)
            throw new HttpError(409, "Book is on hand");
        bookDoc.status = BookStatus.ON_HAND;
        bookDoc.pickList.push({
            reader:readerId,
            pick_date: new Date().toDateString(),
            return_date:null
        });

        bookDoc.save();
    };

    async returnBook(id: string): Promise<void> {
        const bookDoc = await BookMongooseModel.findById(id).exec();
        if(!bookDoc)
            throw new HttpError(404, `Book with id ${id} not found`);
        if(bookDoc.status !== BookStatus.ON_HAND)
            throw new HttpError(409, "Book is on hand");
        bookDoc.status = BookStatus.ON_STOCK;
        const temp = bookDoc.pickList[bookDoc.pickList.length-1];
        temp.return_date = new Date().toDateString();

        bookDoc.save();
    };

    async removeBook(id: string): Promise<Book> {
        throw "";
    };

    async getBooksByGenreAndStatus(genre: BookGenres, status: BookStatus) {
        const result = await BookMongooseModel.find({genre, status}).exec() as Book[];
        return Promise.resolve(result)
    };

    async getBooksPickedUpByReader(readerId:number){
        const result = await BookMongooseModel.find({
            pickList:{$elemMatch: {reader:readerId}}
        }).exec();
        return result;
    };
};

export const libServiceMongo = new LibServiceImplMongo();