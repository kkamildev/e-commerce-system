
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

app.use(express.json());
app.use(cookieParser());
app.use(appRequestsLimit);


const run = async () => {
    await createDatabase();
    db.sync();

    app.get("/", (req, res) => {
        res.status(200).json({
            text:"hello world"
        })
    })

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



    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listening on port ${process.env.PORT || 3000}`)
    })
}


run();


