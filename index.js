import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import "./database/connectdb.js"
import authRouter from "./routers/auth.route.js";
import linkRouter from "./routers/link.route.js";
import redirectRouter from './routers/redirect.router.js';

const app = express();

const whiteList = [process.env.ORIGIN1];

app.use(cors({
        origin: function(origin, callback) {
            if (whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback("No autorizado por CORS");
        },
    })
);

app.use(express.json());
app.use(cookieParser());
app.use('/', redirectRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("🔥 http://localhost:" + PORT ));

