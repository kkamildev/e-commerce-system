import { body } from "express-validator";


export const createValidator = [
    body("storeName").exists().withMessage("storeName is required").isLength({max:30}).withMessage("Maximum length 30"),
    body("storeDescription").exists().withMessage("storeDescription is required").isLength({max:255}).withMessage("Maximum length 255"),
    body("mainPageTitle").exists().withMessage("mainPageTitle is required").isLength({max:30}).withMessage("Maximum length 30"),
    body("mainPageSubtitle").exists().withMessage("mainPageSubtitle is required").isLength({max:50}).withMessage("Maximum length 50"),
]

export const updateValidator = [
    body("storeName").exists().withMessage("storeName is required").isLength({max:30}).withMessage("Maximum length 30"),
    body("storeDescription").exists().withMessage("storeDescription is required").isLength({max:255}).withMessage("Maximum length 255"),
    body("mainPageTitle").exists().withMessage("mainPageTitle is required").isLength({max:30}).withMessage("Maximum length 30"),
    body("mainPageSubtitle").exists().withMessage("mainPageSubtitle is required").isLength({max:50}).withMessage("Maximum length 50"),
]