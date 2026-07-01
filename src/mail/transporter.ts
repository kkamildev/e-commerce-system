
import {createTransport} from "nodemailer"

export const transporter = createTransport({
    host:process.env.MAIL_HOST || "smtp.gmail.com",
    port:Number(process.env.MAIL_PORT) || 587,
    secure:Number(process.env.MAIL_PORT) == 465,
    auth:{
        user:process.env.MAIL_USER || "something@gmail.com",
        pass:process.env.MAIL_PASSWORD || "something@gmail.com",
    }
});

export const pingMailTransporterConnection = async () => {
    try {
      await transporter.verify();
      console.log("Mail service online");
    } catch (error) {
      console.error("Connection failed:", error);
    }
}
