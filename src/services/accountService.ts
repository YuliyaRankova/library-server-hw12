import {Reader} from "../model/Reader.js";

export interface AccountService{
    addAccount:(reader:Reader) => Promise<void>;
    getAccount:(id:number) => Promise<Reader>;
    removeAccount:(id:number) => Promise<Reader>;
    changePassword:(id:number, newPassword: string) => Promise<void>
};