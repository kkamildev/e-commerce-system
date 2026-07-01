

import { catchAsync } from "../middlewares/catchAsync";
import { Config } from "../models/Config";


// GET
export const getConfig = catchAsync(async (req, res) => {
    const config = await Config.findOne();
    res.status(200).json({success:true, message:"Got config", config})
});

// POST
export const createConfig = catchAsync(async (req, res) => {

    const {storeName, storeDescription, mainPageTitle, mainPageSubtitle} = req.body;

    const exist = Config.count();
    if(!exist) {
        await Config.create({storeName, storeDescription, mainPageTitle, mainPageSubtitle});
        res.status(201).json({success:true, message:"Created default config"});
    } else {
        res.status(409).json({success:false, errorMessage:"Config already exist"});
    }
});

// PUT
export const updateConfig = catchAsync(async (req, res) => {
    const {storeName, storeDescription, mainPageTitle, mainPageSubtitle} = req.body;

    await Config.update({storeName, storeDescription, mainPageTitle, mainPageSubtitle}, {where:{}});
    res.status(200).json({success:true, message:"Updated config"})
});


