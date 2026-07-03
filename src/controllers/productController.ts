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
export const getProducts = catchAsync(async (req, res) => {
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


// GET
export const getProduct = catchAsync(async (req, res) => {
    const {productId} = req.query;
    const product = await Product.findByPk(String(productId), {
        include:[{
                model:ProductProperty,
                as:"productProperties",
                include:["id", "name", "note"]
            },
            {
                model:ProductVariant,
                as:"productVariants",
                attributes:["id", "name", "stock", "description", "price"]
            }
        ]
    });

    res.status(200).json({success:true, message:"Got product", product});
});

// GET
export const searchProducts = catchAsync(async (req, res) => {
    const {fullName, categoryString, limit} = req.query;

    const products = await Product.findAll({
        attributes:{
            include:[
                [
                    db.literal(`(
                        SELECT AVG("rating")
                        FROM "opinions"
                        WHERE "opinions"."productId" = "product"."id"
                    )`),
                    "ratingAvg"
                ],
                [
                    db.literal(`(
                        SELECT COUNT(*)
                        FROM "opinions"
                        WHERE "opinions"."productId" = "product"."id"
                    )`),
                    "opinionsCount"
                ]
            ]
        },
        include:[{
            model:ProductVariant,
            as:"productVariants",
            separate:true,
            limit:1
        },
        ],
        where:{
            categoryString:{
                [Op.and]: [
                    {[Op.like]: `${categoryString}%`},
                    {[Op.like]: `%${fullName}%`}
                ]
            }
        },
        limit:Number(limit),
        offset:Math.max(Number(limit) - 30, 0)
    });
    res.status(200).json({success:true, message:"Got searched products", products})
});

// GET
export const getNewestProducts = catchAsync(async (req, res) => {
    const products = await Product.findAll({
        attributes:{
            include:[
                [
                    db.literal(`(
                        SELECT AVG("rating")
                        FROM "opinions"
                        WHERE "opinions"."productId" = "product"."id"
                    )`),
                    "ratingAvg"
                ],
                [
                    db.literal(`(
                        SELECT COUNT(*)
                        FROM "opinions"
                        WHERE "opinions"."productId" = "product"."id"
                    )`),
                    "opinionsCount"
                ]
            ]
        },
        include:[{
            model:ProductVariant,
            as:"productVariants",
            separate:true,
            limit:1
        },
        ],
        order:["createdAt"],
        limit:30
    });
    res.status(200).json({success:true, message:"Got newest products", products})
});

// GET
export const getMostLikedProducts = catchAsync(async (req, res) => {
    const products = await Product.findAll({
        attributes:{
            include:[
                [
                    db.literal(`(
                        SELECT AVG("rating")
                        FROM "opinions"
                        WHERE "opinions"."productId" = "product"."id"
                    )`),
                    "ratingAvg"
                ],
                [
                    db.literal(`(
                        SELECT COUNT(*)
                        FROM "opinions"
                        WHERE "opinions"."productId" = "product"."id"
                    )`),
                    "opinionsCount"
                ]
            ]
        },
        include:[{
            model:ProductVariant,
            as:"productVariants",
            separate:true,
            limit:1
        },
        ],
        order: [
            [db.literal("'ratingAvg'"), "DESC"]
        ],
        limit:30
    });
    res.status(200).json({success:true, message:"Got most liked products", products})
});

// GET
export const getBestSellingProducts = catchAsync(async (req, res) => {
    const products = await Product.findAll({
        attributes:{
            include:[
                [
                    db.literal(`(
                        SELECT AVG("rating")
                        FROM "opinions"
                        WHERE "opinions"."productId" = "product"."id"
                    )`),
                    "ratingAvg"
                ],
                [
                    db.literal(`(
                        SELECT COUNT(*)
                        FROM "opinions"
                        WHERE "opinions"."productId" = "product"."id"
                    )`),
                    "opinionsCount"
                ]
            ]
        },
        include:[{
            model:ProductVariant,
            as:"productVariants",
            separate:true,
            limit:1
        },
        ],
        order: [
            ["sellCount", "DESC"]
        ],
        limit:30
    });
    res.status(200).json({success:true, message:"Got best selling products", products})
});

// POST
export const createProduct = catchAsync(async (req, res) => {
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
export const updateProduct = catchAsync(async (req, res) => {
    const {productId, fullName, description, deliveryNote, categoryString} = req.body;
    const productProperties = req.body.productProperties as ProductPropertyDataScheme[];
    const existingProduct = await Product.findByPk(productId);
    if(existingProduct) {
        const fullNameExist = await Product.count({where:{fullName}});
        if(!fullNameExist) {
            const result = await db.transaction(async (t : Transaction) => {
                await Product.update({fullName, description, deliveryNote, categoryString}, {where:{id:productId}, transaction:t});
                for(const productProperty of productProperties) {
                    await ProductProperty.update({name:productProperty.name, note:productProperty.note}, {where:{id:productProperty.id}, transaction:t})
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
export const deleteProduct = catchAsync(async (req, res) => {
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
