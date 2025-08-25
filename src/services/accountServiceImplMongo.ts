import {AccountService} from "./accountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";
import bcrypt from "bcryptjs";

export class AccountServiceImplMongo implements AccountService{

    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id);
        if(temp) throw new HttpError(409, "Reader already exists");
        const readerDoc = new ReaderModel(reader);
        await readerDoc.save();
    };

    async getAccountById(id: number): Promise<Reader> {
        const result = await ReaderModel.findById(id);
        if(!result)throw new HttpError(404, "Account not found")
        return result as unknown as Reader;
    };

    async changePassword(id: number, oldPassword: string, newPassword: string): Promise<void> {
        const account = await ReaderModel.findById(id);
        if (!account) throw new HttpError(404, `Account not found`);

        const checkPass = bcrypt.compareSync(oldPassword, account.passHash);
        if(!checkPass) throw new HttpError(403, "");
        else{
            const newHash = bcrypt.hashSync(newPassword, 10);
            account.passHash = newHash;
            await account.save();
        }
    };

    async changeReaderData(id: number, newEmail: string, newUserName: string, newBirthDate:string): Promise<void> {
        const account = await ReaderModel.findById(id);
        if (!account) throw new HttpError(404, `Account not found`);

        account.email = newEmail;
        account.userName = newUserName;
        account.birthdate = newBirthDate;
        await account.save();
    };

    async removeAccount(id: number): Promise<Reader> {
        const account = await ReaderModel.findByIdAndDelete(id);
        if (!account) throw new HttpError(404, `Account not found`);
        return account as unknown as Reader;
    };

};

export const accountServiceMongo = new AccountServiceImplMongo();