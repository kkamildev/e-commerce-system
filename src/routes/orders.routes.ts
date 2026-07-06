import { Router } from "express";
import { createValidator } from "../validators/accountVerificationValidators";
import { checkAccountOrders, createOrder, createOrderUsingAccount, deleteDeliveredOrder, getAllProductsOrders, updateOrderStatus } from "../controllers/orderController";
import { createUsingAccountValidator, deleteValidator, getValidator, updateStatusValidator } from "../validators/orderValidators";
import { accountAuth } from "../middlewares/accountAuth";
import { userAuth } from "../middlewares/userAuth";
import { userRoleAuth } from "../middlewares/userRoleAuth";


const router = Router();

// orders/

router.get("/", userAuth(), getValidator, getAllProductsOrders);

router.put("/", userAuth(), userRoleAuth(["Admin", "Producer"]), updateStatusValidator, updateOrderStatus);

router.post("/", createValidator, createOrder);

router.use(accountAuth());

router.post("/account", createUsingAccountValidator, createOrderUsingAccount);

router.get("/account", checkAccountOrders);

router.delete("/", deleteValidator, deleteDeliveredOrder);






export default router;