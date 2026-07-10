import { Op, Transaction } from "sequelize";
import { catchAsync } from "../middlewares/catchAsync";
import { Account } from "../models/Account";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { ProductVariant } from "../models/ProductVariant";
import { AuthenticatedAccountRequest } from "../utils/interfaces";
import { db } from "../utils/db";
import { sendOrderConfirmationEmail } from "../mail/sendOrderConfirmationEmail";



// POST
export const createOrder = catchAsync(async (req, res) => {
    const {personName, personSurname, country, city, postalCode, street, buildingNumber, unitNumber, email, productVariantIds, quantities} = req.body;
    
    
    if(productVariantIds.length == quantities) {
        let index = 0;
        let success = true;
        const result = await db.transaction(async (t : Transaction) => {
            let orders : Order[] = [];

            // payment gate here

            for(const productVariantId of productVariantIds) {
                const existProductvariant = await ProductVariant.findByPk(productVariantId);
                if(existProductvariant) {
                    if(existProductvariant.stock - quantities[index] >= 0) {
                        const order = await Order.create({personName, personSurname, country, city, postalCode, street, buildingNumber, unitNumber, email, productVariantId}, {transaction:t});
                        await ProductVariant.update({stock:existProductvariant.stock - quantities[index]}, {where:{id:existProductvariant.id}, transaction:t});
                        await Product.update({sellCount:existProductvariant.product.sellCount + quantities[index]}, {where:{id:existProductvariant.product.id}, transaction:t});
                        orders.push(order);
                    } else {
                        await t.rollback();
                        res.status(400).json({success:false, errorMessage:"Not enough in stock"});
                        success = false;
                        break;
                    }
                } else {
                    await t.rollback();
                    res.status(404).json({success:false, errorMessage:"Product variant not found"});
                    success = false;
                    break;
                }
                index++;
            }
            return orders;
        });
        if(success) {
            if(productVariantIds.length == 0) {
                const emailInfo = await sendOrderConfirmationEmail(result[0].email, result[0].personName, result[0].personSurname, result);
                res.status(201).json({success:true, message:"Created order", insertId:result[0].id});
            } else {
                res.status(204).json({success:true});
            }
        }
    } else {
        res.status(400).json({success:false, errorMessage:"Quantities and productvVariantsIds are not length equal"})
    }

});

// POST
export const createOrderUsingAccount = catchAsync(async (req : AuthenticatedAccountRequest, res) => {
    const account = req.account;
    const {productVariantIds, quantities} = req.body;

     if(productVariantIds.length == quantities) {
        let index = 0;
        let success = true;
        const result = await db.transaction(async (t : Transaction) => {
            let orders : Order[] = [];

            // payment gate here

            const accountData = await Account.findByPk(account?.id);
            for(const productVariantId of productVariantIds) {
                const existProductvariant = await ProductVariant.findByPk(productVariantId);
                if(existProductvariant) {
                    if(existProductvariant.stock - quantities[index] >= 0) {
                        const order = await Order.create({
                            personName:accountData?.name,
                            personSurname:accountData?.surname,
                            country:accountData?.country,
                            city:accountData?.city,
                            postalCode:accountData?.postalCode,
                            street:accountData?.street,
                            buildingNumber:accountData?.buildingNumber,
                            unitNumber:accountData?.unitNumber,
                            email:accountData?.email,
                            productVariantId
                        });
                        await ProductVariant.update({stock:existProductvariant.stock - quantities[index]}, {where:{id:existProductvariant.id}, transaction:t});
                        await Product.update({sellCount:existProductvariant.product.sellCount + quantities[index]}, {where:{id:existProductvariant.product.id}, transaction:t});
                        orders.push(order);
                    } else {
                        await t.rollback();
                        res.status(400).json({success:false, errorMessage:"Not enough in stock"});
                        success = false;
                        break;
                    }
                } else {
                    await t.rollback();
                    res.status(404).json({success:false, errorMessage:"Product variant not found"});
                    success = false;
                    break;
                }
                index++;
            }
            return orders;
        });
        if(success) {
            if(productVariantIds.length == 0) {
                const emailInfo = await sendOrderConfirmationEmail(result[0].email, result[0].personName, result[0].personSurname, result);
                res.status(201).json({success:true, message:"Created order", insertId:result[0].id});
            } else {
                res.status(204).json({success:true});
            }
        }
    } else {
        res.status(400).json({success:false, errorMessage:"Quantities and productvVariantsIds are not length equal"})
    }
});

// GET
export const checkAccountOrders = catchAsync(async (req : AuthenticatedAccountRequest, res) => {
    const account = req.account;

    const orders = await Order.findAll({
        include:[{
            model:ProductVariant,
            as:"productVariant",
            required:true,
            include:["id", "productId", "name", "price"]
        }],
        where:{
            email:account?.email
        },
        order:["createdAt"]
    });
    
    res.status(200).json({success:true, message:"Got account orders", orders});
});

// GET
export const getAllProductsOrders = catchAsync(async (req, res) => {
    const {status} = req.query;
    const productsOrders = await Product.findAll({
        attributes:["id", "fullName", "deliveryNote"],
        include:[
            {
                model:ProductVariant,
                as:"productVariants",
                required:true,
                attributes:["id", "name"],
                include:[{
                    model:Order,
                    as:"orders",
                    required:true,
                    where:{
                        status:{
                            [Op.ne]:"Delivered",
                            [Op.eq]:status
                        }
                    }
                }]
            }
        ],
        order: [
            [ProductVariant, Order, "createdAt"]
        ]
    });

    res.status(200).json({success:true, message:"Got products orders", products: productsOrders});
});

// PUT
export const updateOrderStatus = catchAsync(async (req, res) => {
    const {id, status} = req.body;
    
    const [affectedRows] = await Order.update({status}, {where:{id}})

    if(affectedRows == 0) {
        const exists = await Order.count({ where: { id } });
        if (!exists) {
            res.status(404).json({success:false, errorMessage:"Order not found"})
        } else {
            res.status(204).json({success:true});
        }
    } else {
        res.status(200).json({success:true, message:"Updated Order"});
    }
});

// DELETE
export const deleteDeliveredOrder = catchAsync(async (req, res) => {
    const {id} = req.body;

    const deletedCount = await Order.destroy({
        where:{
            id,
            status:"Delivered"
        }
    });
    if(deletedCount) {
        res.status(200).json({success:true, message:"Deleted delivered order"});
    } else {
        res.status(404).json({success:false, errorMessage:"Delivered order not found"});
    }
})