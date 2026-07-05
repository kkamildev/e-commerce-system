import { Router } from "express";
import { checkEmailExistsValidator, deleteValidator, registerValidator, updatePasswordValidator, updateValidator } from "../validators/accountValidators";
import { autoLoginAccount, checkEmailExists, deleteAccount, getAccount, loginAccount, logoutAccount, registerAccount, updateAccount, updateAccountPassword } from "../controllers/accountController";
import { loginValidator } from "../validators/userValidators";
import { accountAuth } from "../middlewares/accountAuth";


const router = Router();

// accounts/

router.get("/email-exist", checkEmailExistsValidator, checkEmailExists);

router.post("/register", registerValidator, registerAccount);

router.post("/login", loginValidator, loginAccount);

router.use(accountAuth());
router.post("/auto-login", autoLoginAccount);

router.get("/logout", logoutAccount);

router.get("/account", getAccount);

router.put("/account", updateValidator, updateAccount);

router.put("/account", updatePasswordValidator, updateAccountPassword);

router.delete("/account", deleteValidator, deleteAccount);




export default router;