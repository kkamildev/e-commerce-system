import { Router } from "express";
import { createConfig, getBanner, getConfig, getLogo, updateConfig, uploadBanner, uploadLogo } from "../controllers/configController";
import { createValidator, updateValidator } from "../validators/configValidators";
import { userAuth } from "../middlewares/userAuth";
import { userRoleAuth } from "../middlewares/userRoleAuth";
import { upload } from "../storage/storeBannerUpload";


const router = Router();

// config/

router.get("/banner", getBanner);

router.get("/logo", getLogo);

router.post("/", createValidator, createConfig);

router.get("/", getConfig);

router.use(userAuth());
router.use(userRoleAuth(["Admin"]))

router.post("/banner", upload.single("file"), uploadBanner);

router.post("/logo", upload.single("file"), uploadLogo);


router.put("/", updateValidator, updateConfig);



export default router;