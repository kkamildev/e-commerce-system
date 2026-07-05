import { Router } from "express";
import { createValidator } from "../validators/accountVerificationValidators";
import { createAccountVerification } from "../controllers/accountVerificationController";


const router = Router();

// accounts-verifications/

router.post("/", createValidator, createAccountVerification);


export default router;