import {launchServer} from "./server.ts";
import * as mongoose from "mongoose";
import {MONGO_URI} from "./config/libConfig.js";
import {debuglog} from "node:util";


// launchServer();
mongoose.connect(MONGO_URI).then(() => {
    console.log("Mongo DB successfully connected");
    launchServer();
    })
    .catch(() => console.log("Something went wrong"));
