import { Router } from "express";
import { createValidator, deleteValidator } from "../validators/productPropertyValidators";
import { createProductProperty, deleteProductProperty } from "../controllers/productPropertyController";
import { userRoleAuth } from "../middlewares/userRoleAuth";
import { userAuth } from "../middlewares/userAuth";

const router = Router();

// products-properties/

router.use(userAuth());
router.use(userRoleAuth(["Admin", "Product_manager"]))

router.post("/", createValidator, createProductProperty);

router.delete("/", deleteValidator, deleteProductProperty);



export default router;