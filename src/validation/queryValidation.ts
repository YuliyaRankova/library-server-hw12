import {ObjectSchema} from 'joi'
import {Response, Request,NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";

export const queryValidation = (schema:ObjectSchema) =>
    (req:Request, res:Response, next:NextFunction)=>{

        if(!req.query.id) throw new HttpError(400, "No Id in request");

        const{error} = schema.validate(req.query);
        if(error) throw new HttpError(400, error.message);
        next();
    };