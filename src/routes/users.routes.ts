

import { Router } from "express";
import { authUser, autoLoginUser, checkAdminExist, createAdminIfNotExist, createNewUser, deleteUser, getAllUsers, loginUser, logoutUser, updateUser, updateUserPassword } from "../controllers/userController";
import { createAdminValidator, createUserValidator, deleteUserValidator, loginValidator, updateUserPasswordValidator, updateUserValidator } from "../validators/userValidators";
import { userAuth } from "../middlewares/userAuth";
import { userRoleAuth } from "../middlewares/userRoleAuth";


const router = Router();

// users/

router.get("/admin", checkAdminExist);

router.post("/admin", createAdminValidator, createAdminIfNotExist);

router.post("/login", loginValidator, loginUser);

router.use(userAuth());

router.get("/auth", authUser);

router.post("/auto-login", autoLoginUser);

router.get("/logout", logoutUser);

router.use(userRoleAuth(["Admin"]));
router.get("/", getAllUsers);

router.post("/", createUserValidator, createNewUser);

router.put("/", updateUserValidator, updateUser);

router.put("/password", updateUserPasswordValidator, updateUserPassword);

router.delete("/", deleteUserValidator, deleteUser);


export default router;