import Joi from 'joi'
import {Roles} from "../utils/libTypes.js";

export const BookDtoSchema = Joi.object({
    title:Joi.string().min(2).required(),
    author:Joi.string().min(1).required(),
    genre:Joi.string().required(),
    quantity:Joi.number().min(1).max(10)
});

export const ReaderDtoSchema = Joi.object({
    id:Joi.number().integer().positive().max(999999999).min(100000000).required(), // teudat zeut
    userName: Joi.string().min(1).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(32).pattern(/^[\S]+$/) .required(),
    birthdate:Joi.string().required()
});

export const ChangePasswordDtoSchema = Joi.object({
    id:Joi.number().positive().max(999999999).min(100000000).required(), // teudat zeut
    oldPassword:Joi.string().alphanum().min(8).required(),
    newPassword:Joi.string().alphanum().min(8).required()
});

export const UpdateAccountSchema = Joi.object({
    userName: Joi.string().min(1).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(32).pattern(/^\S+$/) .required(),
});

export const ChangeReaderDataDtoSchema = Joi.object({
    id:Joi.number().positive().max(999999999).min(100000000).required(), // teudat zeut
    newUserName: Joi.string().min(1).required(),
    newEmail:Joi.string().email().required(),
    newBirthDate:Joi.string().required()
});

export const ReaderIdDtoSchema = Joi.object({
    id:Joi.number().integer().positive().max(999999999).min(100000000).required(), // teudat zeut
});

export const ChangeRolesSchema = Joi.array<Roles[]>();
export type ArraySchema = typeof ChangeRolesSchema;