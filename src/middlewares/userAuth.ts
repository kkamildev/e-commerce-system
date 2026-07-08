import { NextFunction, Request, Response } from "express";

import {JwtPayload, verify, sign} from "jsonwebtoken"
import { AuthenticatedUserRequest } from "../utils/interfaces";


interface userPayload extends JwtPayload {
    id: number;
    username:string,
    role:string
}


export const userAuth = () => {
    const createAccessToken = (req : AuthenticatedUserRequest, res : Response, next : NextFunction) => {
        if(req.signedCookies["USER_REFRESH_TOKEN"]) {
            try {
                const decoded = verify(req.signedCookies["USER_REFRESH_TOKEN"], process.env.REFRESH_TOKEN || "HHhbhvjjbioL") as userPayload;
                const {iat, exp, nbf, jti, ...sanitizedClaims} = decoded;
                const accessToken = sign(sanitizedClaims, process.env.ACCESS_TOKEN || "JHj6hVKkPkj5yTknpLu4A", {
                    expiresIn:"10m"
                })
                res.cookie("USER_ACCESS_TOKEN", accessToken, {
                    maxAge:1000*60*10,  
                    httpOnly:true,
                    signed:true,
                    secure:process.env.HTTPS == "true",
                    sameSite:"strict"
                });
                req.user = decoded;
                next();
            } catch (err) {
                res.status(401).json({success:false, unauthorized:true, errorMessage:"Access denied"})
            }
        } else {
            res.status(401).json({success:false, unauthorized:true, errorMessage:"Access denied"})
        }
    }
    return (req: AuthenticatedUserRequest, res : Response, next : NextFunction) => {
        if(req.signedCookies["USER_ACCESS_TOKEN"]) {
            try {
                const decoded = verify(req.cookies["USER_ACCESS_TOKEN"], process.env.ACCESS_TOKEN || "JHj6hVKkPkj5yTknpLu4A") as userPayload;
                req.user = decoded;
                next()
            } catch(err) {
               createAccessToken(req, res, next);
            }
        } else {
            createAccessToken(req, res, next);
        }
    }
}