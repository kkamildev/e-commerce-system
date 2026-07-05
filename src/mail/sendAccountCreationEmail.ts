

import { transporter } from "./transporter"

export const sendAccountCreationEmail = async (email : string, name : string, surname : string) => {
    const info = await transporter.sendMail({
        subject:"Account Created",
        from:process.env.MAIL_USER || "something@gmail.com",
        to:email,
        html:`
        <h2>Hello ${name} ${surname}<h2>
        <h3>Your account have been created</h3>
        <h1>Have a fun!</h1>
        <p>It is automated message. Don't reply</p>
        `
    });
    return info;
}