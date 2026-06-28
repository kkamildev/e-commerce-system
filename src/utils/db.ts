
import { Sequelize } from "sequelize-typescript";
import { Config } from "../models/Config";
import { User } from "../models/User";

export const db = new Sequelize({
    dialect:"mysql",
    host:process.env.DB_HOST || "localhost",
    username:process.env.DB_USER || "root",
    password:process.env.DB_PASSWORD || "",
    database:process.env.DB_NAME || "e_commerce_db",
    models:[Config, User]
})