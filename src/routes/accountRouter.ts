import express, {Response} from 'express';
import * as controller from '../controllers/AccountController.js';
import {bodyValidation} from "../validation/bodyValidation.js";
import {queryValidation} from "../validation/queryValidation.js";
import {
    ChangePasswordDtoSchema,
    ChangeReaderDataDtoSchema,
    ReaderDtoSchema,
    ReaderIdDtoSchema
} from "../validation/joiSchemas.js";

export const accountRouter = express.Router();

accountRouter.post('/', bodyValidation(ReaderDtoSchema), controller.addAccount);
accountRouter.get('/reader', queryValidation(ReaderIdDtoSchema), controller.getAccountById);
accountRouter.patch('/password', bodyValidation(ChangePasswordDtoSchema), controller.changePassword);
accountRouter.patch('/reader_data', bodyValidation(ChangeReaderDataDtoSchema), controller.changeReaderData);
accountRouter.delete('/', controller.removeAccount);

