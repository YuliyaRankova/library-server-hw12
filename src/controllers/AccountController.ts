import {Request, Response} from 'express';
import {Reader, ReaderDto} from "../model/Reader.js";
import {checkReaderId, convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from "../services/accountServiceImplMongo.js";
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";

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

export const updateReaderAccount= async (req: Request, res: Response) => {
    const {id, newEmail, newUserName, newBirthDate} = req.body;
    await accountServiceMongo.updateReaderAccount(id, newEmail, newUserName, newBirthDate);
    res.send("Reader's data changed");
};

export const removeAccount= async (req: AuthRequest, res: Response) => {
    const idParam = req.query.id;
    if (!idParam) res.status(400).send("Id is required")

    const id = checkReaderId(idParam as string);
    const result = await accountServiceMongo.removeAccount(id);
    res.json(result);
};

export const changeRoles = async (req: AuthRequest, res: Response) =>{
    if(!req.roles?.includes(Roles.SUPERVISOR))
        res.status(403).send("Only SUPERVISOR can change roles");

    const idParam = req.query.id;
    if(!idParam) res.status(400).send("Id is required")

    const id = checkReaderId(idParam as string);
    const roles:Roles[] = req.body;
    console.log(roles)
    const updatedAccount = await accountServiceMongo.changeRoles(id, roles);
    res.json(updatedAccount);
};


// export const updateAccount= async (req: Request, res: Response) => {
//     const body = req.body;
//     const _id = checkReaderId(req.query.id as string);
//     const dto:ReaderDto = {...body, id:_id, password:""};
//     const updReader = convertReaderDtoToReader(dto);
//     const updAccount = await accountServiceMongo.updateAccount(updReader);
//     res.json(updAccount);
// };
