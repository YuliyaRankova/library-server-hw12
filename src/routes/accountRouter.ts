import express from 'express';
import * as controller from '../controllers/AccountController.js';
import {bodyValidation} from "../validation/bodyValidation.js";
import {ChangePasswordDtoSchema, ReaderDtoSchema} from "../validation/joiSchemas.js";

export const accountRouter = express.Router();

accountRouter.post('/', bodyValidation(ReaderDtoSchema), controller.addAccount);
accountRouter.get('/reader', controller.getAccount);
accountRouter.patch('/password', bodyValidation(ChangePasswordDtoSchema), controller.changePassword);
accountRouter.delete('/', controller.removeAccount);

