
import { transporter } from "./transporter"


export const sendEmailVerificationMail = async (email : string, name : string, surname : string, code : string) => {
    const info = await transporter.sendMail({
        subject:"Email Verification",
        from:process.env.MAIL_USER || "something@gmail.com",
        to:email,
        html:`
        <h2>Hello ${name} ${surname}<h2>
        <h3>Use this code to verify your account!</h3>
        <h1>${code}</h1>
        <p>It is automated message. Don't reply</p>
        `
    });
    return info;
}