import {Reader} from "../model/Reader.js";

export interface AccountService{
    addAccount:(reader:Reader) => Promise<void>;
    getAccountById: (id: number) => Promise<Reader>;
    removeAccount:(id:number) => Promise<Reader>;
    changePassword:(id:number, oldPassword:string, newPassword:string) => Promise<void>;
    changeReaderData:(id:number, newEmail:string, newUserName:string, newBirthDate:string) => Promise<void>
};