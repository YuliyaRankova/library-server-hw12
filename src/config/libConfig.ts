import mysql from "mysql2/promise";
import dotenv from "dotenv";

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