import { Router } from "express";
import { checkEmailExistsValidator, registerValidator } from "../validators/accountValidators";
import { autoLoginAccount, checkEmailExists, getAccount, loginAccount, logoutAccount, registerAccount } from "../controllers/accountController";
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




export default router;