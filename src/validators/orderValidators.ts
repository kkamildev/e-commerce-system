import { body, query } from "express-validator";

export const createValidator = [
    body("personName").trim().exists({checkFalsy:true}).withMessage("personName is required").isLength({max:50}).withMessage("maximum length 50"),
    body("personSurname").trim().exists({checkFalsy:true}).withMessage("personSurname is required").isLength({max:50}).withMessage("maximum length 50"),
    body("country").trim().exists({checkFalsy:true}).withMessage("country is required").isLength({max:50}).withMessage("maximum length 50"),
    body("city").trim().exists({checkFalsy:true}).withMessage("city is required").isLength({max:50}).withMessage("maximum length 50"),
    body("postalCode").trim().exists({checkFalsy:true}).withMessage("postalCode is required").isLength({max:10}).withMessage("maximum length 10"),
    body("street").trim().exists({checkFalsy:true}).withMessage("street is required").isLength({max:75}).withMessage("maximum length 75"),
    body("postalCode").trim().exists({checkFalsy:true}).withMessage("postalCode is required").isLength({max:10}).withMessage("maximum length 10"),
    body("buildingNumber").trim().exists({checkFalsy:true}).withMessage("buildingNumber is required").isInt({min:1}).withMessage("Must be a positive number"),
    body("unitNumber").trim().isInt({min:1}).withMessage("Must be a positive number"),
    body("email").trim().exists({checkFalsy:true}).withMessage("email is required").isLength({max:75}).withMessage("Maximum length 75").isEmail().withMessage("Must be a email"),
    body("productVariantIds").exists({checkFalsy:true}).withMessage("productVariantIds is required").isArray().withMessage("prductVariantIds must be an array"),
    body("quantities").exists({checkFalsy:true}).withMessage("quantities is required").isArray().withMessage("quantities must be an array"),
    body('quantities.*').isInt({min:1}).withMessage("Each element must be a positive number")
]

export const createUsingAccountValidator = [
    body("productVariantIds").exists({checkFalsy:true}).withMessage("productVariantIds is required").isArray().withMessage("prductVariantIds must be an array"),
    body("quantities").exists({checkFalsy:true}).withMessage("quantities is required").isArray().withMessage("quantities must be an array"),
    body('quantities.*').isInt({min:1}).withMessage("Each element must be a positive number")
]

export const getValidator = [
    query("status").exists({checkFalsy:true}).withMessage("status is required").isWhitelisted(["Waiting", "Preparing", "In transit"]).withMessage("invalid status")
]

export const updateStatusValidator = [
    body("id").exists({checkFalsy:true}).withMessage("id is required"),
    body("status").exists({checkFalsy:true}).withMessage("status is required").isWhitelisted(["Waiting", "Preparing", "In transit"]).withMessage("invalid status")
]

export const deleteValidator = [
    body("id").exists({checkFalsy:true}).withMessage("id is required"),
]