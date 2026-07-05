import { body } from "express-validator";


export const createValidator = [
    body("email").trim().exists().withMessage("email is required").isLength({max:75}).withMessage("Maximum length 75"),
    body("name").trim().exists().withMessage("name is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("surname").trim().exists().withMessage("surname is required").isLength({max:50}).withMessage("Maximum length 50"),
]