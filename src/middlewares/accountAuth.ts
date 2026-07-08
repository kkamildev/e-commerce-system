import { NextFunction, Request, Response } from "express";

import {JwtPayload, verify, sign} from "jsonwebtoken"
import { AuthenticatedAccountRequest} from "../utils/interfaces";


interface accountPayload extends JwtPayload {
    id: string;
    name:string
    surname: string,
    email:string
}


export const accountAuth = () => {
    const createAccessToken = (req : AuthenticatedAccountRequest, res : Response, next : NextFunction) => {
        if(req.signedCookies["ACCOUNT_REFRESH_TOKEN"]) {
            try {
                const decoded = verify(req.signedCookies["ACCOUNT_REFRESH_TOKEN"], process.env.REFRESH_TOKEN || "HHhbhvjjbioL") as accountPayload;

                const {iat, exp, nbf, jti, ...sanitizedClaims} = decoded;
                const accessToken = sign(sanitizedClaims, process.env.ACCESS_TOKEN || "JHj6hVKkPkj5yTknpLu4A", {
                    expiresIn:"10m"
                })
                res.cookie("ACCOUNT_ACCESS_TOKEN", accessToken, {
                    maxAge:1000*60*10,  
                    httpOnly:true,
                    signed:true,
                    secure:process.env.HTTPS == "true",
                    sameSite:"strict"
                });
                req.account = sanitizedClaims;
                next();
            } catch (err) {
                res.status(401).json({success:false, unauthorized:true, errorMessage:"Access denied"})
            }
        } else {
            res.status(401).json({success:false, unauthorized:true, errorMessage:"Access denied"})
        }
    }
    return (req: AuthenticatedAccountRequest, res : Response, next : NextFunction) => {
        if(req.cookies["ACCOUNT_ACCESS_TOKEN"]) {
            try {
                const decoded = verify(req.signedCookies["ACCOUNT_ACCESS_TOKEN"], process.env.ACCESS_TOKEN || "JHj6hVKkPkj5yTknpLu4A") as accountPayload;
                req.account = decoded;
                next()
            } catch(err) {
               createAccessToken(req, res, next);
            }
        } else {
            createAccessToken(req, res, next);
        }
    }
}