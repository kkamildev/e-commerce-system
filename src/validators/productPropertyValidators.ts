import { body } from "express-validator";



export const createValidator = [
    body("productId").trim().exists({checkFalsy:true}).withMessage("productId is required"),
    body("name").trim().exists({checkFalsy:true}).withMessage("name is required").isLength({max:30}).withMessage("Maximum length 30"),
    body("note").trim().exists({checkFalsy:true}).withMessage("note is required").isLength({max:100}).withMessage("Maximum length 100"),
]

export const deleteValidator = [
    body("id").trim().exists({checkFalsy:true}).withMessage("id is required"),
]