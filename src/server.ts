
// env injection
import { config } from "dotenv";
config();

import express from "express";
import createDatabase from "./utils/createDB";
import { db } from "./utils/db";
import cors from "cors"

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}));

app.use(express.json());

const run = async () => {
    await createDatabase();
    db.sync();

    app.get("/", (req, res) => {
        res.status(200).json({
            text:"hello world"
        })
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listening on port ${process.env.PORT || 3000}`)
    })
}


run();


