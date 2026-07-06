
import multer from "multer"
import path from "node:path"
import fs from "fs"



const storage = multer.diskStorage({
    destination(req, file, callback) {
        try {
            const destination = path.join(__dirname, "..", "..", "uploads", "config");
            if(!fs.existsSync(destination))  {
                fs.mkdirSync(destination, {recursive:true});
            }
            callback(null, destination)
        } catch (err) {
            const errorObject = err instanceof Error ? err : new Error(String(err));
            callback(errorObject, "")
        }
    },
    filename(req, file, callback) {
        try {
            callback(null, "logo" + path.extname(file.originalname))
        } catch (err) {
            const errorObject = err instanceof Error ? err : new Error(String(err));
            callback(errorObject, "")
        }
    },
});

export const upload = multer({
    storage,
    fileFilter(req, file, callback) {
        const filetypes = /png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return callback(null, true);
        } else {
            callback(new Error("Only .png files are allowed"));
        }
    },
    limits:{
        fileSize:1024 * 1024 * 20 // 20MB
    }
})