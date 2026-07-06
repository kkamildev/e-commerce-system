

import path from "node:path";
import fs from "fs"
import { catchAsync } from "../middlewares/catchAsync";
import { Config } from "../models/Config";
import { MulterRequest } from "../utils/interfaces";


// GET
export const getConfig = catchAsync(async (req, res) => {
    const config = await Config.findOne();
    res.status(200).json({success:true, message:"Got config", config})
});

// GET
export const getBanner = catchAsync(async (req, res) => {
    const destination = path.join(__dirname, "..", "..", "uploads", "config", "banner.jpg");
    if(!fs.existsSync(destination)) {
        res.status(404).json({success:false, errorMessage:"banner not found"})
    } else {
        res.status(200).sendFile(destination);
    }
})

// GET
export const getLogo = catchAsync(async (req, res) => {
    const destination = path.join(__dirname, "..", "..", "uploads", "config", "logo.png");
    if(!fs.existsSync(destination)) {
        res.status(404).json({success:false, errorMessage:"logo not found"})
    } else {
        res.status(200).sendFile(destination);
    }
})

// POST
export const uploadBanner = catchAsync(async (req : MulterRequest, res) => {
    if(req.file) {
        res.status(201).json({success:true, message:"File uploaded successfully"})
    } else {
        res.status(400).json({success:false, errorMessage:"File uploading failed"})
    }
})

export const uploadLogo = catchAsync(async (req : MulterRequest, res) => {
    if(req.file) {
        res.status(201).json({success:true, message:"File uploaded successfully"})
    } else {
        res.status(400).json({success:false, errorMessage:"File uploading failed"})
    }
})

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


