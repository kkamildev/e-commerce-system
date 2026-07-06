import { Router } from "express";
import { createValidator, deleteValidator, getOneValidator, getValidator, searchValidator, updateValidator } from "../validators/productValidators";
import { createProduct, deleteProduct, getBestSellingProducts, getMostLikedProducts, getNewestProducts, getProduct, getProducts, searchProducts, updateProduct } from "../controllers/productController";
import { userAuth } from "../middlewares/userAuth";
import { userRoleAuth } from "../middlewares/userRoleAuth";


const router = Router();

// products/


router.get("/product", getOneValidator, getProduct);

router.get("/search", searchValidator, searchProducts);

router.get("/newest", getNewestProducts);

router.get("/most-liked", getMostLikedProducts);

router.get("/bestsellers", getBestSellingProducts);

router.use(userAuth());

router.get("/", userRoleAuth(["Admin", "Product_manager", "Sales_manager"]), getValidator, getProducts);

router.post("/", userRoleAuth(["Admin", "Product_manager"]), createValidator, createProduct);

router.put("/", userRoleAuth(["Admin", "Product_manager"]), updateValidator, updateProduct);

router.delete("/", userRoleAuth(["Admin", "Product_manager"]), deleteValidator, deleteProduct);

export default router;