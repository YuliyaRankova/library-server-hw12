import {Reader} from "../model/Reader.js";
import {Roles} from "../utils/libTypes.js";

export interface AccountService{
    addAccount:(reader:Reader) => Promise<void>;
    getAccountById: (id: number) => Promise<Reader>;
    removeAccount:(id:number) => Promise<Reader>;
    changePassword:(id:number, oldPassword:string, newPassword:string) => Promise<void>;
    updateReaderAccount:(id:number, newEmail:string, newUserName:string, newBirthDate:string) => Promise<void>;
    changeRoles:(id:number, role:Roles[]) => Promise<Reader>;
};