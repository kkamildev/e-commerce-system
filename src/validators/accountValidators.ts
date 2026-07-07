import { body, query } from "express-validator";



export const checkEmailExistsValidator = [
    query("email").trim().exists().withMessage("email is required").isEmail().withMessage("Must be a email")
]

export const registerValidator = [
    body("email").trim().exists({checkFalsy:true}).withMessage("email is required").isLength({max:75}).withMessage("Maximum length 75").isEmail().withMessage("Must be a email"),
    body("password").exists({checkFalsy:true}).withMessage("password is required").isLength({max:72}).withMessage("Maximum length 72"),
    body("name").trim().exists({checkFalsy:true}).withMessage("name is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("surname").trim().exists({checkFalsy:true}).withMessage("surname is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("country").trim().exists({checkFalsy:true}).withMessage("country is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("city").trim().exists({checkFalsy:true}).withMessage("city is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("postalCode").trim().exists({checkFalsy:true}).withMessage("postalCode is required").isLength({max:10}).withMessage("Maximum length 10"),
    body("street").trim().exists({checkFalsy:true}).withMessage("street is required").isLength({max:75}).withMessage("Maximum length 10"),
    body("buildingNumber").trim().isInt({min:1}).withMessage("buildingNumber is required").isNumeric({no_symbols:true}).withMessage("Must be a positive number"),
    body("unitNumber").trim().isInt({min:1}).withMessage("Must be a positive number")
    
]

export const loginValidator = [
    body("email").trim().exists().withMessage("email is required").isEmail().withMessage("Must be a email"),
    body("password").exists().withMessage("password is required")
]

export const updateValidator = [
    body("name").trim().exists({checkFalsy:true}).withMessage("name is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("surname").trim().exists({checkFalsy:true}).withMessage("surname is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("country").trim().exists({checkFalsy:true}).withMessage("country is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("city").trim().exists({checkFalsy:true}).withMessage("city is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("postalCode").trim().exists({checkFalsy:true}).withMessage("postalCode is required").isLength({max:10}).withMessage("Maximum length 10"),
    body("street").trim().exists({checkFalsy:true}).withMessage("street is required").isLength({max:75}).withMessage("Maximum length 10"),
    body("buildingNumber").trim().exists({checkFalsy:true}).withMessage("buildingNumber is required").isInt({min:1}).withMessage("Must be a positive number"),
    body("unitNumber").trim().isInt({min:1}).withMessage("Must be a positive number")
]

export const updatePasswordValidator = [
    body("oldPassword").exists({checkFalsy:true}).withMessage("oldPassword is required").isLength({max:72}).withMessage("Maximum length 72"),
    body("password").exists({checkFalsy:true}).withMessage("password is required").isLength({max:72}).withMessage("Maximum length 72"),
]

export const deleteValidator = [
    body("password").exists({checkFalsy:true}).withMessage("password is required").isLength({max:72}).withMessage("Maximum length 72"),
]