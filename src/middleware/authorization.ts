/*
PATCH/accounts/password => Roles.USER,
GET/accounts/reader => Roles.USER, Roles.ADMIN
 */
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {NextFunction, Response} from "express";
import {HttpError} from "../errorHandler/HttpError.js";
import {checkReaderId} from "../utils/tools.js";


export const authorize = (pathRoutes: Record<string, Roles[]>) =>{
    return (req: AuthRequest, res:Response, next:NextFunction) => {
        const route = req.method + req.path;
        console.log(route);
        const roles = req.roles;
        console.log(roles);

        if(!roles || roles.some(role => pathRoutes[route].includes(role)))
            next();
        else throw new HttpError(403, "Error send by authorization")
    };
};

export const checkAccountById = (checkPathId: string[]) =>{
    return(req: AuthRequest, res:Response, next:NextFunction) =>{
        const route = req.method + req.path;
        const roles = req.roles;

        if(!roles ||
            !checkPathId.includes(route) ||
            (
                !req.roles!.includes(Roles.ADMIN) &&
                (req.roles!.includes(Roles.USER) || req.roles!.includes(Roles.LIBRARIAN)) &&
                req.userId == req.query.id
                    // || req.userId === idFromBody)
            )
        )
            next();
        else throw new HttpError(403, "You can get/modify only your own account")
    }
}
