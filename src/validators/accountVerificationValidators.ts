import { body } from "express-validator";


export const createValidator = [
    body("email").trim().exists({checkFalsy:true}).withMessage("email is required").isLength({max:75}).withMessage("Maximum length 75").isEmail().withMessage("Must be a email"),
    body("name").trim().exists({checkFalsy:true}).withMessage("name is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("surname").trim().exists({checkFalsy:true}).withMessage("surname is required").isLength({max:50}).withMessage("Maximum length 50"),
]