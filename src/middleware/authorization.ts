/*
PATCH/accounts/password => Roles.USER,
GET/accounts/reader => Roles.USER, Roles.ADMIN
 */
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {Response, NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";

export const authorize = (protectedRoutes: Record<string, Roles[]>, publicRoutes:string[]) =>{
    return (req: AuthRequest, res:Response, next:NextFunction) => {
        const route = req.method + req.path;
        if(publicRoutes.includes(route))
            return next();

        const roles = req.roles;
        if(roles?.some(role => protectedRoutes[route].includes(role)))
            return next();
        else throw new HttpError(403, "")
    };
};
