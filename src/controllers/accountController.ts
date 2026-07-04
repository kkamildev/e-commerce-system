import { sign } from "jsonwebtoken";
import { catchAsync } from "../middlewares/catchAsync";
import { Account } from "../models/Account";
import { AccountVerification } from "../models/AccountVerification";
import bcrypt from "bcrypt"
import { AuthenticatedAccountRequest } from "../utils/interfaces";
import { Response } from "express";



// GET
export const checkEmailExists = catchAsync(async (req, res) => {
    const {email} = req.query;

    const exist = await Account.count({where:{email}});
    if(exist) {
        res.status(200).json({success:true, message:"This email is already taken", exist:true});
    } else {
        res.status(200).json({success:true, message:"This email is free", exist:false});
    }
});

// POST
export const registerAccount = catchAsync(async (req, res) => {
    const {email, password, name, surname, country, city, postalCode, street, buildingNumber, unitNumber, activationCode} = req.body;
    const emailExist = await Account.count({where:{email}});
    if(!emailExist) {
        const verification = await AccountVerification.findOne({where:{email}});
        if(verification) {
            if(verification.expireDate > new Date()) {
                const verified = await bcrypt.compare(activationCode, verification.code)
                if(verified) {
                    const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 10));
                    const account = await Account.create({name, surname, country, city, postalCode, street, buildingNumber, unitNumber, email, password:passwordHash});
                    await AccountVerification.destroy({where:{email}});
                    res.status(201).json({success:true, message:"Registered User", insertId:account.id});
                } else {
                    res.status(401).json({success:false, errorMessage:"Verification failed"});
                }
            } else {
                res.status(400).json({success:false, errorMessage:"Verification expired"});
            }
        } else {
            res.status(404).json({success:false, errorMessage:"Verification not available"});
        }
    } else {
        res.status(409).json({success:false, errorMessage:"This email is already taken"});
    }
});

// POST
export const loginAccount = catchAsync( async (req, res) => {
    const {email, password} = req.body;
    const account = await Account.findOne({where:{
        email
    }});
    if(account) {
        const accountPass = account.password;
        const verified = await bcrypt.compare(password, accountPass);
        if(verified) {
            const token = sign({
                id:account.id,
                name:account.name,
                surname:account.surname,
                email:account.email,
            }, process.env.REFRESH_TOKEN || "HHhbhvjjbioL", {
                expiresIn:"7d"
            });
            res.status(200).json({success:true, message:"Login success", user:{id:account.id, name:account.name, surname:account.surname, email:account.email,}}).cookie("ACCOUNT_REFRESH_TOKEN", token, {
                maxAge:7 * 24 * 60 * 60 * 1000,
                httpOnly:true,
                sameSite:"strict",
                signed:true,
                secure:process.env.HTTPS == "true"
            })
        } else {
            res.status(401).json({success:false, errorMessage:"Invalid password"})
        }

    } else {
        res.status(404).json({success:false, errorMessage:"Account not found"})
    }
});

// POST
export const autoLoginAccount = catchAsync(async (req : AuthenticatedAccountRequest , res : Response) => {
    const account = req.account;
    if(account) {
        const token = sign({
            id:account.id,
            name:account.name,
            surname:account.surname,
            email:account.email,
        }, process.env.REFRESH_TOKEN || "HHhbhvjjbioL", {
            expiresIn:"7d"
        });
        res.status(200).json({success:true, message:"Login success", user:{id:account.id, name:account.name, surname:account.surname, email:account.email,}}).cookie("ACCOUNT_REFRESH_TOKEN", token, {
            maxAge:7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:"strict",
            signed:true,
            secure:process.env.HTTPS == "true"
        })
    } else {
        res.status(401).json({success:false, errorMessage:"Token expired"});
    }
});

// GET
export const logoutAccount = catchAsync(async (req, res) => {
    res.clearCookie("ACCOUNT_REFRESH_TOKEN");
    res.clearCookie("ACCOUNT_ACCESS_TOKEN");
});

// GET
export const getAccount = catchAsync(async (req : AuthenticatedAccountRequest, res : Response) => {
    const account = req.account;

    const user = await Account.findByPk(account?.id, {attributes:["id", "name", "surname", "country", "city", "postalCode", "street", "buildingNumber", "unitNumber", "email"]});
    if(user) {
        res.status(200).json({success:true, message:"Got account data", user})
    } else {
        res.status(404).json({success:false, errorMessage:"Account not found"});
    }
});

// PUT
export const updateAccount = catchAsync(async (req : AuthenticatedAccountRequest, res : Response) => {
    const account = req.account;
    const {name, surname, country, city, postalCode, street, buildingNumber, unitNumber} = req.body;

    const [affectedRows] = await Account.update({name, surname, country, city, postalCode, street, buildingNumber, unitNumber}, {where:{id:account?.id}});

    if(affectedRows == 0) {
        const exists = await Account.count({ where: { id:account?.id } });
        if (!exists) {
            res.status(404).json({success:false, errorMessage:"Account not found"})
        } else {
            res.status(204);
        }
    } else {
        res.status(200).json({success:true, message:"Updated account"});
    }
});

// PUT
export const updateAccountPassword = catchAsync(async (req : AuthenticatedAccountRequest, res : Response) => {
    const account = req.account;
    const {oldPassword, password} = req.body;

    const user = await Account.findByPk(account?.id);
    if(user) {
        const verified = await bcrypt.compare(oldPassword, user.password);
        if(verified) {
            const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 10));
            await Account.update({password:passwordHash}, {where:{id:user.id}});
            res.status(200).json({success:true, message:"Updated account password"})
        } else {
            res.status(401).json({success:false, errorMessage:"Invalid password"})
        }

    } else {
        res.status(404).json({success:false, errorMessage:"Account not found"})
    }
        
});
// DELETE
export const deleteAccount = catchAsync(async (req : AuthenticatedAccountRequest, res : Response) => {
    const account = req.account;
    const {password} = req.body;
    const user = await Account.findByPk(account?.id);
    if(user) {
        const verified = await bcrypt.compare(password, user.password);
        if(verified) {
            await Account.destroy({where:{id:user.id}});
            res.status(200).json({success:true, message:"Deleted account"});
        } else {
            res.status(401).json({success:false, errorMessage:"Invalid password"})
        }

    } else {
        res.status(404).json({success:false, errorMessage:"Account not found"})
    }
});