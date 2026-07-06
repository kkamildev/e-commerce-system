import { body, query } from "express-validator";


export const getValidator = [
    query("fullName").trim().exists().withMessage("fullName is required")
]

export const getOneValidator = [
    query("productId").trim().exists({checkFalsy:true}).withMessage("productId is required")
]

export const searchValidator = [
    query("fullName").trim().exists().withMessage("fullName is required"),
    query("categoryString").trim().exists().withMessage("categoryString is required"),
    query("limit").default(30).trim().exists({checkFalsy:true}).withMessage("limit is required").isInt({min:1}).withMessage("limit must be a positive number")
]

export const createValidator = [
    body("fullName").trim().exists({checkFalsy:true}).withMessage("fullName is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("description").trim().exists({checkFalsy:true}).withMessage("description is required").isLength({max:400}).withMessage("Maximum length 400"),
    body("deliveryNote").trim().exists({checkFalsy:true}).withMessage("deliveryNote is required").isLength({max:100}).withMessage("Maximum length 100"),
    body("categoryString").trim().exists({checkFalsy:true}).withMessage("categoryString is required").isLength({max:100}).withMessage("Maximum length 100"),
    body("productProperties").trim().exists({checkFalsy:true}).withMessage("productProperties is required").isArray().withMessage("productProperties must be an array"),
    body("productProperties.*.name").trim().exists({checkFalsy:true}).withMessage("each product property require a name").isLength({max:30}).withMessage("Maximum length 30"),
    body("productProperties.*.note").trim().exists({checkFalsy:true}).withMessage("each product property require a note").isLength({max:100}).withMessage("Maximum length 100"),
]

export const updateValidator = [
    body("id").trim().exists({checkFalsy:true}).withMessage("id is required"),
    body("fullName").trim().exists({checkFalsy:true}).withMessage("fullName is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("description").trim().exists({checkFalsy:true}).withMessage("description is required").isLength({max:400}).withMessage("Maximum length 400"),
    body("deliveryNote").trim().exists({checkFalsy:true}).withMessage("deliveryNote is required").isLength({max:100}).withMessage("Maximum length 100"),
    body("categoryString").trim().exists({checkFalsy:true}).withMessage("categoryString is required").isLength({max:100}).withMessage("Maximum length 100"),
    body("productProperties.*.name").trim().exists({checkFalsy:true}).withMessage("each product property require a name").isLength({max:30}).withMessage("Maximum length 30"),
    body("productProperties.*.note").trim().exists({checkFalsy:true}).withMessage("each product property require a note").isLength({max:100}).withMessage("Maximum length 100"),
    body("productProperties.*.id").trim()
]

export const deleteValidator = [
    body("id").trim().exists({checkFalsy:true}).withMessage("id is required"),
]