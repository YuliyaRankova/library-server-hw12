import {Book, BookGenres} from "../model/Book.ts";

export interface LibService{
    addBook:(book: Book) => boolean;
    removeBook:(id: string) => Book;
    pickUpBook: (id: string, reader: string) => void; // update
    returnBook:(id: string) => void;
    getAllBooks:() => Book[];
    getBooksByGenre: (genre: BookGenres) => Book[]
};
