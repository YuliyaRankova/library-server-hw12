import {LibService} from "./libService.js";
import {Book, BookGenres, BookStatus, Reader} from "../model/BookSQL.js";
import {pool} from "../config/libConfig.js";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {HttpError} from "../errorHandler/HttpError.js";
import {v4 as uuidv4} from "uuid";


export class LibServiceImplSQL implements LibService{

    async addBook(book: Book): Promise<boolean> {
        const result = await pool.query('INSERT INTO books VALUES(?,?,?,?,?)',
            [book.id, book.title, book.author, book.genre, book.status]);
        if(!result)
        return Promise.resolve(false);
        return Promise.resolve(true);
    }

    async getAllBooks(): Promise<Book[]> {
        const [books] = await pool.query<RowDataPacket[]>('SELECT * FROM books');
        return Promise.resolve(books as Book[])
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        const [books] = await pool.query<RowDataPacket[]>('SELECT * FROM books WHERE genre = ?', [genre]);
        return Promise.resolve(books as Book[]);
    }

    async getBooksByGenreAndStatus(genre: BookGenres, status: BookStatus): Promise<Book[]> {
        const [books] = await pool.query<RowDataPacket[]>('SELECT * FROM books WHERE genre=? AND status=?', [genre, status]);
        return Promise.resolve(books as Book[]);
    }

    async pickUpBook(id: string, reader: string): Promise<void> {
        if(!reader)
            throw new HttpError(400, "Reader name is required");

        const [bookRows] = await pool.query<RowDataPacket[]>('SELECT id, status FROM books WHERE id=?', [id]);
        if(bookRows.length === 0)
            throw new HttpError(404, `Book with id ${id} not found`);
        if(bookRows[0].status !== BookStatus.ON_STOCK)
            throw new HttpError(409, "Book is on hand");

        let readerId = await this.getReaderId(reader);
        if(readerId === null){
            readerId = await this.createReader(reader);
        };
        const pickDate = new Date().toISOString().slice(0,10);

        await pool.query('INSERT INTO books_readers (book_id, reader_id, pick_date) VALUES (?,?,?)', [id, readerId, pickDate]);

        await pool.query('UPDATE books SET status=? WHERE id=?', [BookStatus.ON_HAND, id])
    };
    async getReaderId(reader:string):Promise<string | null> {
        const [readerRow] = await pool.query<RowDataPacket[]>('SELECT id FROM readers WHERE reader_name=?', [reader]);
        return readerRow.length > 0 ? readerRow[0].id : null
    };
    async createReader(reader: string): Promise<string> {
        const readerId = uuidv4();
        await pool.query<RowDataPacket[]>('INSERT INTO readers (id, reader_name) VALUES(?,?)', [readerId, reader]);
        return readerId;
    };

    async returnBook(id: string): Promise<void> {
        const [bookRows] = await pool.query<RowDataPacket[]>('SELECT id, status FROM books WHERE id=?', [id]);
        if (bookRows.length === 0)
            throw new HttpError(404, `Book with id ${id} not found`);
        if (bookRows[0].status !== BookStatus.ON_HAND)
            throw new HttpError(409, "Book is on stock");

        const returnDate = new Date().toISOString().slice(0, 10);

        await pool.query('UPDATE books_readers SET return_date=? WHERE book_id=? AND return_date IS NULL', [returnDate, id]);

        await pool.query('UPDATE books SET status=? WHERE id=?', [BookStatus.ON_STOCK, id]);
    };

    async removeBook(id: string): Promise<Book> {
        const [bookRows] = await pool.query<RowDataPacket[]>('SELECT * FROM books WHERE id=?', [id]);
        if (bookRows.length === 0)
            throw new HttpError(404, `Book with id ${id} not found`);

        const book = bookRows[0];
        if(book.status !== BookStatus.ON_STOCK)
            throw new HttpError(400, `Book with id ${id} cannot be removed because it is currently on hand`);

        await pool.query<ResultSetHeader>('DELETE FROM books WHERE id=?', [id]);

        return book as Book;
    };

};

export const libServiceSql = new LibServiceImplSQL();