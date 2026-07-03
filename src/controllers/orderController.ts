import { Op, Transaction } from "sequelize";
import { catchAsync } from "../middlewares/catchAsync";
import { Account } from "../models/Account";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { ProductVariant } from "../models/ProductVariant";
import { AuthenticatedAccountRequest } from "../utils/interfaces";
import { db } from "../utils/db";



// POST
export const createOrder = catchAsync(async (req, res) => {
    const {personName, personSurname, country, city, postalCode, street, buildingNumber, unitNumber, email, productVariantId} = req.body;
    
    const existProductvariant = await ProductVariant.findByPk(productVariantId);
    if(existProductvariant) {
        if(existProductvariant.stock > 0) {
            const result = await db.transaction(async (t : Transaction) => {
                
                // extension of payment here
            
                const order = await Order.create({personName, personSurname, country, city, postalCode, street, buildingNumber, unitNumber, email, productVariantId}, {transaction:t});
                await ProductVariant.update({stock:existProductvariant.stock - 1}, {where:{id:existProductvariant.id}, transaction:t});

                return order;
            })
        
            res.status(201).json({success:true, message:"Created order", insertId:result.id});
        } else {
            res.status(400).json({success:false, errorMessage:"Not enough in stock"})
        }
    } else {
        res.status(404).json({success:false, errorMessage:"Product variant not found"});
    }
});

// POST
export const createOrderUsingAccount = catchAsync(async (req : AuthenticatedAccountRequest, res) => {
    const account = req.account;
    const {productVariantId} = req.body;

    const existProductvariant = await ProductVariant.findByPk(productVariantId);

    if(existProductvariant) {
        const accountData = await Account.findByPk(account?.id);
        if(existProductvariant.stock > 0) {
            const result = await db.transaction(async (t : Transaction) => {
                // extension of payment here
            
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
                await ProductVariant.update({stock:existProductvariant.stock - 1}, {where:{id:existProductvariant.id}, transaction:t});
                return order;
            })
            res.status(201).json({success:true, message:"Created order", insertId:result.id});
        } else {
            res.status(400).json({success:false, errorMessage:"Not enough in stock"})
        }
    } else {
        res.status(404).json({success:false, errorMessage:"Product variant not found"});
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
const updateOrderStatus = catchAsync(async (req, res) => {
    const {orderId, status} = req.body;
    
    const [affectedRows] = await Order.update({status}, {where:{id:orderId}})

    if(affectedRows == 0) {
        const exists = await Order.count({ where: { id:orderId } });
        if (!exists) {
            res.status(404).json({success:false, errorMessage:"Order not found"})
        } else {
            res.status(204);
        }
    } else {
        res.status(200).json({success:true, message:"Updated Order"});
    }
});

// DELETE
const deleteDeliveredOrder = catchAsync(async (req, res) => {
    const {orderId} = req.body;

    const deletedCount = await Order.destroy({
        where:{
            id:orderId,
            status:"Delivered"
        }
    });
    if(deletedCount) {
        res.status(200).json({success:true, message:"Deleted delivered order"});
    } else {
        res.status(404).json({success:false, errorMessage:"Delivered order not found"});
    }
})