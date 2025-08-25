import {Request, Response} from 'express';
import {Reader, ReaderDto} from "../model/Reader.js";
import {checkReaderId, convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from "../services/accountServiceImplMongo.js";
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const addAccount= async (req: Request, res: Response) => {
    const body = req.body as ReaderDto;
    const reader: Reader = convertReaderDtoToReader(body);
    await accountServiceMongo.addAccount(reader);
    res.status(201).send();
};

export const getAccountById= async (req: Request, res: Response) => {
    const {id} = req.query;
    const account = await accountServiceMongo.getAccountById(id as unknown as number);
    res.json(account);
};

export const changePassword= async (req: Request, res: Response) => {
    const {id, oldPassword, newPassword} = req.body;
    await accountServiceMongo.changePassword(id, oldPassword, newPassword);
    res.send("Password changed");
};

export const changeReaderData= async (req: Request, res: Response) => {
    const {id, newEmail, newUserName, newBirthDate} = req.body;
    await accountServiceMongo.changeReaderData(id, newEmail, newUserName, newBirthDate);
    res.send("Reader's data changed");
};


export const removeAccount= async (req: AuthRequest, res: Response) => {
    const idParam = req.query.id;
    if (!idParam) res.status(400).send("Id is required")

    const id = checkReaderId(idParam as string);
    // if(id === req.userId || req.roles?.includes(Roles.ADMIN)){
    //     const result = await accountServiceMongo.removeAccount(id);
    //     res.json(result);
    // }else {
    //     throw new HttpError(403, "")
    // }

    const result = await accountServiceMongo.removeAccount(id);
    res.json(result);
};
