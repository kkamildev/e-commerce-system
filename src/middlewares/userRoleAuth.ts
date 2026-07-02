import { NextFunction, Response } from "express";
import { AuthenticatedUserRequest } from "../utils/interfaces";


export const userRoleAuth = (requiredRoles : string[]) => {
    return (req : AuthenticatedUserRequest, res : Response, next : NextFunction) => {
        if(req.user) {
            if(requiredRoles.includes(req.user.role)) {
                next();
            } else {
                res.status(403).json({success:false, errorMessage:"Resource Forbidden", forbidden:true})
            }
        } else {
            res.status(401).json({success:false, errorMessage:"User unauthorized", unauthorized:true})
        }
    }
}