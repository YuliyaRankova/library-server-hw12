import express, {Request, Response, NextFunction} from 'express';
import * as controller from '../controllers/BookControllerFunc.js';
import {bodyValidation} from "../validation/bodyValidation.js";
import {BookDtoSchema} from "../validation/joiSchemas.js";

export const bookRouter = express.Router();

bookRouter.get('/',controller.getAllBooks);
bookRouter.post('/',bodyValidation(BookDtoSchema), controller.addBook);
bookRouter.delete('/:id',controller.removeBook);
bookRouter.patch('/pickup',controller.pickUpBook);
bookRouter.patch('/return',controller.returnBook);
bookRouter.get('/genre',controller.getBooksByGenre);
bookRouter.get('/genre_status',controller.getBooksByGenreAndStatus);
bookRouter.get('/books', controller.getBooksPickedUpByReader);