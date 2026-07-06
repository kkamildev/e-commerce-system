import { Router } from "express";
import { createValidator, deleteValidator, getImageValidator, getOneValidator, getValidator, searchValidator, updateValidator } from "../validators/productValidators";
import { createProduct, deleteProduct, getBestSellingProducts, getMostLikedProducts, getNewestProducts, getProduct, getProductImage, getProducts, searchProducts, updateProduct, uploadProductImage } from "../controllers/productController";
import { userAuth } from "../middlewares/userAuth";
import { userRoleAuth } from "../middlewares/userRoleAuth";
import { upload } from "../storage/productImageUplaod";


const router = Router();

// products/

router.get("/image", getImageValidator, getProductImage);

router.get("/product", getOneValidator, getProduct);

router.get("/search", searchValidator, searchProducts);

router.get("/newest", getNewestProducts);

router.get("/most-liked", getMostLikedProducts);

router.get("/bestsellers", getBestSellingProducts);

router.use(userAuth());

router.get("/", userRoleAuth(["Admin", "Product_manager", "Sales_manager"]), getValidator, getProducts);

router.post("/image", upload.single("file"), uploadProductImage)

router.post("/", userRoleAuth(["Admin", "Product_manager"]), createValidator, createProduct);

router.put("/", userRoleAuth(["Admin", "Product_manager"]), updateValidator, updateProduct);

router.delete("/", userRoleAuth(["Admin", "Product_manager"]), deleteValidator, deleteProduct);

export default router;