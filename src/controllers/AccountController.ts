import express, {Request, Response, NextFunction} from 'express';
import {Reader, ReaderDto} from "../model/Reader.js";
import {convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from "../services/accountServiceImplMongo.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const addAccount= async (req: Request, res: Response) => {
    const body = req.body as ReaderDto;
    const reader: Reader = convertReaderDtoToReader(body);
    await accountServiceMongo.addAccount(reader);

    res.status(201).send();
};

export const getAccount= async (req: Request, res: Response) => {
    const idParam = req.query.id;
    if(!idParam) res.status(400).send("Id is required");

    const id = Number(req.query.id);
    if(isNaN(id)) res.status(400).send("Wrong Id");

    const result = await accountServiceMongo.getAccount(id);
    res.json(result);
};

export const changePassword= async (req: Request, res: Response) => {
    const body = req.body;
    const reader = convertReaderDtoToReader(body);
    await accountServiceMongo.changePassword(reader._id, reader.passHash);
    res.status(200).send();
};

export const removeAccount= async (req: Request, res: Response) => {
    const idParam = req.query.id;
    if (!idParam) res.status(400).send("Id is required")

    const id = Number(req.query.id);
    if(isNaN(id)) res.status(400).send("Wrong id");

    const result = await accountServiceMongo.removeAccount(id);
    res.json(result);
};
