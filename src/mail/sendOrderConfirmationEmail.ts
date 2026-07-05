

import { Order } from "../models/Order";
import { transporter } from "./transporter"

export const sendOrderConfirmationEmail = async (email : string, name : string, surname : string, orders : Order[]) => {
    const info = await transporter.sendMail({
        subject:"Order Confirmation",
        from:process.env.MAIL_USER || "something@gmail.com",
        to:email,
        html:`
        <h2>Hello ${name} ${surname}<h2>
        <h3>Your payment was successfully</h3>
        <h3>Your ${orders.length} item(s) order is progressing</h3>
        <h1>Your order</h1>
        <p>${orders.map((obj) => `Quantity: ${obj.quantity} ${obj.productVariant.product.fullname} Variant: ${obj.productVariant.name}`)}</p>
        <p>It is automated message. Don't reply</p>
        `
    });
    return info;
}