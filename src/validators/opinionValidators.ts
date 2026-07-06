import { body, query } from "express-validator";



export const getProductsOpinionsValidator = [
    query("productId").trim().exists({checkFalsy:true}).withMessage("productId is required"),
    query("limit").default(30).trim().exists({checkFalsy:true}).withMessage("limit is required").isInt({min:1}).withMessage("limit must be a positive number")
]

export const createValidator = [
    body("productId").trim().exists({checkFalsy:true}).withMessage("productId is required"),
    body("rating").trim().exists({checkFalsy:true}).withMessage("rating is required").isInt({min:1, max:5}).withMessage("rating must be a positive number in range [1;5]"),
    body("comment").trim().exists({checkFalsy:true}).withMessage("comment is required").isLength({max:300}).withMessage("maximum length 300")
]

export const updateValidator = [
    body("rating").trim().exists({checkFalsy:true}).withMessage("rating is required").isInt({min:1, max:5}).withMessage("rating must be a positive number in range [1;5]"),
    body("comment").trim().exists({checkFalsy:true}).withMessage("comment is required").isLength({max:300}).withMessage("maximum length 300")
]
