import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import "./database/connectdb.js"
import authRouter from "./routers/auth.route.js";
import linkRouter from "./routers/link.route.js";
import bookRouter from "./routers/book.route.js";
import authorRouter from "./routers/author.route.js";
import redirectRouter from './routers/redirect.router.js';

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];


app.use(cors({
        origin: function(origin, callback) {
            console.log("😲😲😲 =>", origin);
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                "Origen " + origin + " no autorizado por CORS"
                );
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use('/', redirectRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("🔥 http://localhost:" + PORT ));

