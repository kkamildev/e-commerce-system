
import multer from "multer"
import path from "node:path"
import fs from "fs"
import { Product } from "../models/Product";



const storage = multer.diskStorage({
    destination(req, file, callback) {
        try {
            const destination = path.join(__dirname, "..", "..", "uploads", "products");
            if(!fs.existsSync(destination))  {
                fs.mkdirSync(destination, {recursive:true});
            }
            callback(null, destination)
        } catch (err) {
            const errorObject = err instanceof Error ? err : new Error(String(err));
            callback(errorObject, "")
        }
    },
    async filename(req, file, callback) {
        try {
            const id  = req.body.productId || null;
            const index = req.body.fileIndex || null;
            if(id == null || index == null) {
                callback(null, `garbage` + path.extname(file.originalname))
            } else {
                const foundProduct = await Product.findByPk(id)
                if(!foundProduct) {
                    callback(null, `garbage` + path.extname(file.originalname))
                } else {
                    callback(null, `${Math.min(5, Math.max(index, 0))}-${id}` + path.extname(file.originalname))
                }

            }
        } catch (err) {
            const errorObject = err instanceof Error ? err : new Error(String(err));
            callback(errorObject, "")
        }
    },
});

export const upload = multer({
    storage,
    fileFilter(req, file, callback) {
        const filetypes = /jpg/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return callback(null, true);
        } else {
            callback(new Error("Only .jpg files are allowed"));
        }
    },
    limits:{
        fileSize:1024 * 1024 * 5 // 5MB
    }
})