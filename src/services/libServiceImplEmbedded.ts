// import {LibService} from "./libService.ts";
// import {Book, BookGenres, BookStatus} from "../model/Book.ts";
// import {HttpError} from "../errorHandler/HttpError.js";
//
// export class LibServiceImplEmbedded implements LibService{
//     private books:Book[] = [];
//
//     addBook(book: Book): Promise<boolean> {
//         const index = this.books.findIndex(item => item.id === book.id);
//         if(index === -1){
//             this.books.push(book);
//             return Promise.resolve(true);
//         }
//         return Promise.resolve(false);
//     }
//
//     getAllBooks(): Promise<Book[]> {
//         return Promise.resolve([...this.books]);
//     }
//
//     getBooksByGenre(genre: BookGenres): Promise<Book[]> {
//         return Promise.resolve(this.books.filter(item => item.genre === genre));
//     }
//
//     pickUpBook(id: string, reader: string): Promise<void> {
//         const book = this.getBookById(id);
//         if(book.status !== BookStatus.ON_STOCK) throw new HttpError(409, "No this book on stock")
//         book.status = BookStatus.ON_HAND
//         book.pickList.push({pick_date: new Date().toDateString(), reader: reader, return_date: null});
//     }
//
//     removeBook(id: string): Promise<Book> {
//         const book = this.getBookById(id);
//         this.books = this.books.filter(b => b.id !== id);
//         return Promise.resolve(book);
//     }
//
//     returnBook(id: string): void {
//         const book = this.getBookById(id);
//         if(book.status !== BookStatus.ON_HAND) throw new HttpError(409, "This book is on stock")
//         book.status=BookStatus.ON_STOCK;
//         book.pickList[book.pickList.length - 1].return_date = new Date().toDateString();
//     }
//
//     getBookById(id: string) {
//         const res = this.books.find(b => b.id === id);
//         if(!res) throw new HttpError(404, `Book with id ${id} not found`);
//         return res;
//     }
// };
//
// export const libServiceEmbedded = new LibServiceImplEmbedded();