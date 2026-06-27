
// env injection
import { config } from "dotenv";
config();

import express from "express";
import createDatabase from "./utils/createDB";


const app = express();

const run = async () => {
    await createDatabase();

}


run();


