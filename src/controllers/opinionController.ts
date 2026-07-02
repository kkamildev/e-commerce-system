import { Op } from "sequelize";
import { catchAsync } from "../middlewares/catchAsync";
import { Account } from "../models/Account";
import { Opinion } from "../models/Opinion";
import { AuthenticatedAccountRequest } from "../utils/interfaces";
import { Product } from "../models/Product";

// GET
export const getProductOpinions = catchAsync(async(req : AuthenticatedAccountRequest, res) => {
    const account = req.account;
    const {productId, limit} = req.query;
    const opinions = await Opinion.findAll({
        include:[{
            model:Account,
            as:"account",
            required:true,
            attributes:["id", "name", "surname"]
        }],
        where:{
            productId:{
                [Op.eq]:productId
            },
            accountId:{
                [Op.ne]:account?.id
            }
        },
        order:["createdAt"],
        limit:Number(limit),
        offset:Math.max(Number(limit) - 20, 0)

    });
    res.status(200).json({success:true, message:"Got opinions", opinions});
});

// GET
export const getAccountOpinion = catchAsync(async (req : AuthenticatedAccountRequest, res) => {
    const account = req.account;
    const opinion = await Opinion.findOne({
        include:[{
            model:Account,
            as:"account",
            required:true,
            attributes:["id", "name", "surname"]
        }],
        where:{
            accountId:account?.id
        },
    });
    res.status(200).json({success:true, message:"Got account opinion", opinion});
});

// POST
export const createOpinion = catchAsync(async (req : AuthenticatedAccountRequest, res) => {
    const account = req.account;
    const {productId, rating, comment} = req.body;

    const existProduct = await Product.findByPk(productId);
    if(existProduct) {
        const existOpinion = await Opinion.findOne({
            where:{
                productId,
                accountId:account?.id
            }
        });
        if(!existOpinion) {
            const opinion = await Opinion.create({rating, comment, accountId:account?.id, productId});
            res.status(201).json({success:true, message:"Created opinion", insertId:opinion.id});
        } else {
            res.status(409).json({success:false, errorMessage:"Opinion already exist"});
        }
    } else {
        res.status(404).json({success:false, errorMessage:"Product not found"})
    }
});

// PUT
export const updateOpinion = catchAsync(async (req : AuthenticatedAccountRequest, res) => {
    const account = req.account;
    const {rating, comment} = req.body;
    const opinionExist = await Opinion.count({where:{accountId:account?.id}});

    if(opinionExist) {
        await Opinion.update({rating, comment}, {where:{accountId:account?.id}});
        res.status(200).json({success:true, message:"Updated opinion"})
    } else {
        res.status(404).json({success:false, errorMessage:"Opinion not found"});
    }
});

// DELETE
export const deleteOpinion = catchAsync(async (req : AuthenticatedAccountRequest, res) => {
    const account = req.account;

    const deletedCount = await Opinion.destroy({where:{accountId:account?.id}});
    if(deletedCount) {
        res.status(200).json({success:true, message:"Deleted opinion"});
    } else {
        res.status(404).json({success:false, errorMessage:"Opinion not found"});
    }
});