import mysql from "mysql2/promise";
import dotenv from "dotenv";
import {Roles} from "../utils/libTypes.js";

export const PORT = 3000;
export const MONGO_URI = "mongodb+srv://nikypod:TEHOJoMn2zwPI4LA@cluster0.azjsayd.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0";
dotenv.config();

//====================== mySQL Connection=================================
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    database: process.env.DB_NAME,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

export const SKIP_ROUTES = [
    "POST/accounts"
];

export const protectedRoutes: Record<string, Roles[]>={
    "PATCH/accounts/password": [Roles.USER],
    "PATCH/accounts/reader_data": [Roles.USER],
    "GET/accounts/reader": [Roles.USER, Roles.ADMIN],
    "DELETE/accounts": [Roles.USER, Roles.ADMIN]
};

export const publicRoutes=["POST/accounts"];