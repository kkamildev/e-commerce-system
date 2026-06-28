
import { Sequelize } from "sequelize-typescript";
import { Config } from "../models/Config";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { ProductProperty } from "../models/ProductProperty";
import { ProductVariant } from "../models/ProductVariant";
import { Order } from "../models/Order";

export const db = new Sequelize({
    dialect:"mysql",
    host:process.env.DB_HOST || "localhost",
    username:process.env.DB_USER || "root",
    password:process.env.DB_PASSWORD || "",
    database:process.env.DB_NAME || "e_commerce_db",
    models:[Config, User, Product, ProductProperty, ProductVariant, Order],
    logging:false
})