import { body } from "express-validator";


export const createAdminValidator = [
    body("username").trim().exists().withMessage("username is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("email").trim().exists().withMessage("email is required").isLength({max:75}).withMessage("Maximum length 75"),
    body("password").trim().exists().withMessage("email is required").isLength({max:72}).withMessage("Maximum length 72")
]

export const loginValidator = [
    body("email").trim().exists().withMessage("email is required"),
    body("password").trim().exists().withMessage("password is required"),
]

export const createUserValidator = [
    body("username").trim().exists().withMessage("username is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("email").trim().exists().withMessage("email is required").isLength({max:75}).withMessage("Maximum length 75"),
    body("password").trim().exists().withMessage("email is required").isLength({max:72}).withMessage("Maximum length 72"),
    body("role").trim().exists().withMessage("role is required").isWhitelisted(["Admin", "Product_manager", "Sales_manager", "Producer"]).withMessage("role is not allowed")
]

export const updateUserValidator = [
    body("id").trim().exists().withMessage("id is required"),
    body("username").trim().exists().withMessage("username is required").isLength({max:50}).withMessage("Maximum length 50"),
    body("email").trim().exists().withMessage("email is required").isLength({max:75}).withMessage("Maximum length 75"),
    body("role").trim().exists().withMessage("role is required").isWhitelisted(["Admin", "Product_manager", "Sales_manager", "Producer"]).withMessage("role is not allowed")
]

export const updateUserPasswordValidator = [
    body("id").trim().exists().withMessage("id is required"),
    body("newPassword").trim().exists().withMessage("email is required").isLength({max:72}).withMessage("Maximum length 72"),
]
export const deleteUserValidator= [
    body("id").trim().exists().withMessage("id is required"),
]