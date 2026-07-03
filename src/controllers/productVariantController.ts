import { Op } from "sequelize";
import { catchAsync } from "../middlewares/catchAsync";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { ProductVariant } from "../models/ProductVariant";


// POST
export const createProductVariant = catchAsync(async (req, res) => {
    const {productId, name, stock, description, price} = req.body;

    const existProduct = await Product.findByPk(productId);

    if(existProduct) {
        const productVariant = await ProductVariant.create({productId, name, stock, description, price});
        res.status(201).json({success:true, message:"Created product Variant", insertId:productVariant.id});
    } else {
        res.status(404).json({success:false, errorMessage:"Product not exist"});
    }
});

// PUT
export const updateProductVariant = catchAsync(async (req, res) => {
    const {id, name, stock, description, price} = req.body;
    const [affectedRows] = await ProductVariant.update({name, stock, description, price}, {where:{id:id}});
    if(affectedRows == 0) {
        const exists = await ProductVariant.count({ where: { id } });
        if (!exists) {
            res.status(404).json({success:false, errorMessage:"Product variant not found"})
        } else {
            res.status(204);
        }
    } else {
        res.status(200).json({success:true, message:"Updated product variant"});
    }
})
// DELETE
export const deleteProductVariant = catchAsync(async (req, res) => {
    const {id} = req.body;
    const existProductVariant = await ProductVariant.findByPk(id);
    if(existProductVariant) {
        const ordersRelatedToProductCount = await Order.count({
            include:[{
                model:ProductVariant,
                as:"productVariant",
                required:true,
                where:{
                    id:existProductVariant.id
                }
            }],
            where:{
                status:{
                    [Op.ne]:"Delivered"
                }
            }
        });
        if(ordersRelatedToProductCount == 0) {
            await ProductVariant.destroy({where:{id}});
            res.status(200).json({success:false})
        } else {
            res.status(409).json({success:false, errorMessage:"Require no orders"})
        }
    } else {
        res.status(404).json({success:false, errorMessage:"Product variant not exist"})
    }
});
