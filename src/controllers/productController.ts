import { Op, Transaction } from "sequelize";
import { catchAsync } from "../middlewares/catchAsync";
import { Product } from "../models/Product";
import { ProductProperty } from "../models/ProductProperty";
import { db } from "../utils/db";
import { ProductVariant } from "../models/ProductVariant";
import { Sequelize } from "sequelize-typescript";
import { Order } from "../models/Order";



interface ProductPropertyDataScheme {
    id?:string,
    name:string,
    note:string
}


// GET
const getProducts = catchAsync(async (req, res) => {
    const {fullName} = req.query;
    const products = await Product.findAll({
        include:[{
            model:ProductVariant,
            as:"productVariants",
            required:false,
            include:[{
                model:Order,
                as:"orders",
                required:false,
                attributes:["id"],
                where:{
                    status:{
                        [Op.ne]:"Delivered"
                    }
                }
            }]
        },
        {
            model:ProductProperty,
            as:"productProperties",
            required:false
        }
        ],
        where:{
            fullName:{
                [Op.like]:`%${fullName}%`
            }
        },
        order: [
            [Sequelize.literal("`productVariants`.`id` IS NULL"), "DESC"],
            ["fullName", "ASC"]
        ]
    });
    res.status(200).json({success:true, message:"Got products", products});
});

// POST
const createProduct = catchAsync(async (req, res) => {
    const {fullName, description, deliveryNote, categoryString} = req.body;
    const productProperties = req.body.productProperties as ProductPropertyDataScheme[];
    const fullNameExist = await Product.count({where:{fullName}});
    if(!fullNameExist) {
        const result = await db.transaction(async (t: Transaction) => {
            const product = await Product.create({fullName, description, deliveryNote, categoryString}, {transaction:t});
            for(const property of productProperties) {
                await ProductProperty.create({name:property.name, note:property.note, productId:product.id}, {transaction:t});
            }
            return product;
        });
        res.status(201).json({success:true, message:"Created product", insertId:result.id});
    } else {
        res.status(409).json({success:false, errorMessage:"This product name already exist"});
    }
});

// PUT
const updateProduct = catchAsync(async (req, res) => {
    const {productId, fullName, description, deliveryNote, categoryString} = req.body;
    const productProperties = req.body.productProperties as ProductPropertyDataScheme[];
    const existingProduct = await Product.findByPk(productId);
    if(existingProduct) {
        const fullNameExist = await Product.count({where:{fullName}});
        if(!fullNameExist) {
            const result = await db.transaction(async (t : Transaction) => {
                await Product.update({fullName, description, deliveryNote, categoryString}, {where:{id:productId}, transaction:t});
                for(const productProperty of productProperties) {
                    await ProductProperty.update({name:productProperty.name, note:productProperty.note}, {where:{id:productProperty.id}})
                }
            });
            res.status(200).json({success:true, message:"Updated product"})
        } else {
            res.status(409).json({success:false, errorMessage:"This product name already exist"});
        }
    } else {
        res.status(404).json({success:false, errorMessage:"Product not found"})
    }
});

// DELETE
const deleteProduct = catchAsync(async (req, res) => {
    const {productId} = req.body;
    const existProduct = await Product.findByPk(productId);
    if(existProduct) {
        const ordersRelatedToProductCount = await Order.count({
            include:[{
                model:ProductVariant,
                as:"productVariant",
                required:true,
                include:[{
                    model:Product,
                    as:"product",
                    required:true,
                    where:{
                        id:productId
                    }
                }]
            }],
            where:{
                status:{
                    [Op.ne]:"Delivered"
                }
            }
        });
        if(ordersRelatedToProductCount == 0) {
            await Product.destroy({where:{id:productId}});
            res.status(200).json({success:false})
        } else {
            res.status(409).json({success:false, errorMessage:"Require no orders"})
        }
    } else {
        res.status(404).json({success:false, errorMessage:"Product not exist"})
    }
});
