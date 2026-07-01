
import { Request, Response } from "express";
import { validationResult} from "express-validator";


type AsyncController = (req: Request, res: Response) => Promise<void>

export const catchAsync = (callback : AsyncController) => {
    return async (req : Request, res : Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({success:false, errorMessage:"Validation Error", errors: errors.array() });
            }
            await callback(req, res);
        } catch(err) {
            res.status(500).json({success:false, serverError:true, errorMessage:"Internal Server Error", error:err});
        }
    }
}