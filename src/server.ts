import express, {Request, Response, NextFunction} from 'express';
import {PORT} from "./config/libConfig.ts";
import {libRouter} from "./routes/libRouter.ts";
import {errorHandler} from "./errorHandler/errorHandler.ts";
import morgan from "morgan";
import * as fs from "node:fs";
import dotenv from "dotenv";

export const launchServer = () => {
    //======= Load environments ==========
    dotenv.config();
    // console.log(process.env);

    const app = express();
    app.listen(process.env.PORT, () => console.log(`Server runs at http://localhost:${process.env.PORT}`));
    const logStream = fs.createWriteStream("access.log", {flags: "a"});

    //MIDDLEWARE
    app.use(express.json()); // parse stream into json
    app.use(morgan("dev")); // token: "dev", "short"
    app.use(morgan("combined", {stream: logStream}));

    //ROUTER
    app.use('/api', libRouter);
    app.use((req: Request, res: Response) => {
        res.status(404).send("Page not found")
    });

    //ERROR HANDLER
    app.use(errorHandler);

};