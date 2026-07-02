import { Request, Response } from "express"
import { catchAsync } from "../middlewares/catchAsync"
import { AccountVerification } from "../models/AccountVerification";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt"
import { sendEmailVerificationMail } from "../mail/sendEmailVerificationMail";


// POST
export const createAccountVerification = catchAsync(async (req : Request , res : Response) => {
    const {email, name, surname} = req.body;

    await AccountVerification.destroy({where:{email}});

    const code = nanoid(6);
    const hashedCode = await bcrypt.hash(code, Number(process.env.BCRYPT_ROUNDS || 10));
    const verification = await AccountVerification.create({
        email,
        code:hashedCode,
        expireDate:new Date(Date.now() + 60 * 60 * 1000)
    });

    const emailInfo = await sendEmailVerificationMail(email, name, surname, code);
    if(emailInfo.accepted) {
        console.log("Email verification succeed");
    } else {
        console.log("Email verification failed");
    }

    res.status(201).json({success:true, message:"Created account Verification and sent mail", insertId:verification.id});
});

