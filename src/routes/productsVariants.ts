import { Router } from "express";
import { userAuth } from "../middlewares/userAuth";
import { userRoleAuth } from "../middlewares/userRoleAuth";
import { createValidator, deleteValidator } from "../validators/productVariantValidators";
import { createProductVariant, deleteProductVariant, updateProductVariant } from "../controllers/productVariantController";
import { updateValidator } from "../validators/accountValidators";

const router = Router();

// products-variants/


router.use(userAuth());
router.use(userRoleAuth(["Admin", "Product_manager"]))

router.post("/", createValidator, createProductVariant);

router.put("/", updateValidator, updateProductVariant);

router.delete("/", deleteValidator, deleteProductVariant);


export default router;