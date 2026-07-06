import { Router } from "express";
import { createConfig, getConfig, updateConfig } from "../controllers/configController";
import { createValidator, updateValidator } from "../validators/configValidators";
import { userAuth } from "../middlewares/userAuth";
import { userRoleAuth } from "../middlewares/userRoleAuth";


const router = Router();

// config/

router.use(userAuth());
router.use(userRoleAuth(["Admin"]))

router.get("/", getConfig);

router.post("/", createValidator, createConfig);

router.put("/", updateValidator, updateConfig);



export default router;