
// env injection
import { config } from "dotenv";
config();

import express from "express";
import createDatabase from "./utils/createDB";
import { db } from "./utils/db";
import cors from "cors"
import path from "node:path";
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit";
import { transporter, pingMailTransporterConnection } from "./mail/transporter";
import { createBackup } from "./utils/createBackup";
import { schedule } from "node-cron";
import { deleteOldFiles } from "./utils/deleteOldFiles";


const appRequestsLimit = rateLimit({
    windowMs:60 * 1000,
    max:Number(process.env.REQUESTS_PER_MINUTE || 60),
    handler:(req, res, next, options) => {
        console.log(`Too many request for IP: ${req.ip}`);
        res.status(options.statusCode).json({
            success: false,
            error: "Too many requests",
            retryAfter: Math.ceil(options.windowMs / 1000)
        });
    }
});
const app = express();

// foundation middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_TOKEN || "JBJKLnKKJpoUTFvH5FNMGE4764yi"));
app.use(appRequestsLimit);


const run = async () => {
    // services
    await createDatabase();
    await pingMailTransporterConnection();
    db.sync({alter:process.env.PRODUCTION == "false"});
    
    // routes

    app.get("/", (req, res) => {
        res.status(200).json({
            text:"hello world"
        })
    })
    
    // hosting front-end
    if(process.env.PRODUCTION == "true") {
        app.use(express.static(path.join(__dirname, "app", "dist")));
        app.use((req, res) => res.sendFile(path.join(__dirname, "app", "dist", "index.html")))
    } else {
        app.use(cors({
            origin:"http://localhost:5173",
            methods:["GET", "POST", "PUT", "DELETE"],
        }));
        app.use((req, res) => res.status(404).json({error:"Route not found"}));
    }


    // node cron (backups creating and old backups delete)

    schedule("0 0 6 * * *", async () => {
        createBackup("backups");
        await deleteOldFiles(path.join(__dirname, "..", "backups"));
    })

    // listening
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listening on port ${process.env.PORT || 3000}`)
    })
}


run();


