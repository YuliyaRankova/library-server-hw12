import {Book, BookGenres} from "../model/Book.js";
import {LibService} from "./libService.js";

export const asyncAdapter = (service: LibService) => {
    return {
        addBook: (book: Book) =>
            Promise.resolve(service.addBook(book)),

        removeBook: (id: string) =>
            Promise.resolve(service.removeBook(id)),

        pickUpBook: (id: string, reader: string) =>
            Promise.resolve(service.pickUpBook(id, reader)),

        returnBook: (id: string) =>
            Promise.resolve(service.returnBook(id)),

        getAllBooks: () =>
            Promise.resolve(service.getAllBooks()),

        getBooksByGenre: (genre: BookGenres) =>
            Promise.resolve(service.getBooksByGenre(genre)),
    };
}