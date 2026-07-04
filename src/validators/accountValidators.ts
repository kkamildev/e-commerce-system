import { body, query } from "express-validator";



export const checkEmailExistsValidator = [
    query("email").trim().exists().withMessage("email is required")
]

export const registerValidator = [
    body("email").trim().exists().withMessage("email is required").isLength({max:75}).withMessage("Maximum length 75"),
    body("password").trim().exists().withMessage("email is required").isLength({max:72}).withMessage("Maximum length 72"),
    body("name").trim().exists().withMessage("name is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("surname").trim().exists().withMessage("surname is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("country").trim().exists().withMessage("country is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("city").trim().exists().withMessage("city is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("postalCode").trim().exists().withMessage("postalCode is required").isLength({max:10}).withMessage("Maximum length 10"),
    body("street").trim().exists().withMessage("street is required").isLength({max:75}).withMessage("Maximum length 10"),
    body("buildingNumber").trim().exists().withMessage("buildingNumber is required").isNumeric({no_symbols:true}).withMessage("Must be a positive number"),
    body("unitNumber").trim().exists().withMessage("unitNumber is required").isNumeric({no_symbols:true}).withMessage("Must be a positive number")
    
]

export const loginValidator = [
    body("email").trim().exists().withMessage("email is required"),
    body("password").trim().exists().withMessage("email is required")
]