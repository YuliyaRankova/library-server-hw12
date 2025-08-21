import {AccountService} from "./accountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class AccountServiceImplMongo implements AccountService{

    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id);
        if(temp) throw new HttpError(409, "Reader already exists");
        // const readerDoc = new ReaderModel(reader);
        const readerDoc = new ReaderModel({
            _id: reader._id,
            userName: reader.userName,
            email: reader.email,
            passHash: reader.passHash,
            birthdate: reader.birthdate
        });
        await readerDoc.save();
    };

    async getAccount(id: number): Promise<Reader> {
        const reader = await ReaderModel.findById(id);
        if(!reader)throw new HttpError(404, `Reader with id ${id} not found`)
        return reader as unknown as Reader;
    };

    async changePassword(id: number, newPassword: string): Promise<void> {
        const reader = await ReaderModel.findById(id);
        if (!reader) throw new HttpError(404, `Reader with id ${id} not found`);

        reader.passHash = newPassword;
        await reader.save();
    };

    async removeAccount(id: number): Promise<Reader> {
        const reader = await ReaderModel.findByIdAndDelete(id);
        if (!reader) throw new HttpError(404, `Reader with id ${id} not found`);
        return Promise.resolve(reader);
    };

};

export const accountServiceMongo = new AccountServiceImplMongo();