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
    "POST/accounts", "GET/api/books"
];

export const PATH_ROUTES = {
    "GET/accounts/reader" : [Roles.USER, Roles.ADMIN, Roles.LIBRARIAN],
    "PATCH/accounts/password" : [Roles.USER, Roles.LIBRARIAN],
    "PATCH/accounts/update" : [Roles.USER, Roles.ADMIN, Roles.LIBRARIAN],
    "DELETE/accounts" : [Roles.SUPERVISOR],
    "PUT/accounts/roles" : [Roles.SUPERVISOR],
    "POST/api/books": [Roles.LIBRARIAN],
    "GET/api/books": [Roles.LIBRARIAN],
    "DELETE/api/books": [Roles.LIBRARIAN],
    "PATCH/api/books/pickup": [Roles.LIBRARIAN],
    "PATCH/api/books/return": [Roles.LIBRARIAN],
    "GET/api/books/books": [Roles.LIBRARIAN]
};

export const CHECK_ID_ROUTES = ["GET/accounts/reader", "PATCH/accounts/password", "PATCH/accounts/update"];
