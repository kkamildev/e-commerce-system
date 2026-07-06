import { Router } from "express";
import { createValidator, getProductsOpinionsValidator, updateValidator } from "../validators/opinionValidators";
import { createOpinion, deleteOpinion, getAccountOpinion, getProductOpinions, updateOpinion } from "../controllers/opinionController";
import { accountAuth } from "../middlewares/accountAuth";


const router = Router();

// opinions/

router.use(accountAuth());

router.get("/", getProductsOpinionsValidator, getProductOpinions);

router.get("/account", getAccountOpinion);

router.post("/", createValidator, createOpinion);

router.put("/", updateValidator, updateOpinion);

router.delete("/", deleteOpinion);


export default router;