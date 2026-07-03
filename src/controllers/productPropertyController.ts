import { catchAsync } from "../middlewares/catchAsync";
import { Product } from "../models/Product";
import { ProductProperty } from "../models/ProductProperty";



// POST
export const createProductProperty = catchAsync(async (req, res) => {
    const {productId, name, note} = req.body;

    const existingProduct = await Product.findByPk(productId);
    if(existingProduct) {
        const productProperty = await ProductProperty.create({name, note, productId});

        res.status(201).json({success:true, message:"Created product property", insertId:productProperty});
    } else {
        res.status(404).json({success:false, errorMessage:"Product not found"});
    }
});

// DELETE
export const deleteProductProperty = catchAsync(async (req, res) => {
    const {id} = req.body;
    const deletedCount = await ProductProperty.destroy({where:{id}});

    if(deletedCount) {
        res.status(200).json({success:true, message:"Deleted product Property"});
    } else {
        res.status(404).json({success:false, errorMessage:"Product property not found"});
    }
})