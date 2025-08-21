import Joi from 'joi'

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
    password:Joi.string().alphanum().min(8).required()
});