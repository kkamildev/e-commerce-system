import { Router } from "express";
import { createConfig, getConfig, updateConfig } from "../controllers/configController";
import { createValidator, updateValidator } from "../validators/configValidators";


const router = Router();

// config/

router.get("/", getConfig);

router.post("/", createValidator, createConfig);

router.put("/", updateValidator, updateConfig);



export default router;