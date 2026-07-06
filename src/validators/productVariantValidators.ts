import { body } from "express-validator";


export const createValidator = [
    body("productId").trim().exists({checkFalsy:true}).withMessage("productId is required"),
    body("name").trim().exists({checkFalsy:true}).withMessage("name is required").isLength({max:20}).withMessage("Maximum length 20"),
    body("stock").trim().exists({checkFalsy:true}).withMessage("stock is required").isInt({min:0}).withMessage("stock must be a positive total number"),
    body("description").trim().exists({checkFalsy:true}).withMessage("description is required").isLength({max:250}).withMessage("Maximum length 250"),
    body("price").trim().exists({checkFalsy:true}).withMessage("price is required").isFloat({min:0}).withMessage("price must be a positivefloating point number"),
]

export const updateValidator = [
    body("id").trim().exists({checkFalsy:true}).withMessage("id is required"),
    body("name").trim().exists({checkFalsy:true}).withMessage("name is required").isLength({max:20}).withMessage("Maximum length 20"),
    body("stock").trim().exists({checkFalsy:true}).withMessage("stock is required").isInt({min:0}).withMessage("stock must be a positive total number"),
    body("description").trim().exists({checkFalsy:true}).withMessage("description is required").isLength({max:250}).withMessage("Maximum length 250"),
    body("price").trim().exists({checkFalsy:true}).withMessage("price is required").isFloat({min:0}).withMessage("price must be a positivefloating point number"),
]

export const deleteValidator = [
    body("id").trim().exists({checkFalsy:true}).withMessage("id is required")
]