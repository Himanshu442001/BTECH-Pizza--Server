import express, { urlencoded } from "express";
import dotenv from "dotenv";

import { connectPassport } from "./utils/Provider.js";

import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";



const app = express();

dotenv.config({
    path:"./config/config.env"
});

// using Middleware

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,

    // cookie will display from here only....

    cookie:{
        secure:process.env.NODE_ENV === "development" ? false : true,
        httpOnly:process.env.NODE_ENV === "development" ? false : true,
        sameSite:process.env.NODE_ENV === "development" ? false : "none",
    }
   
}));

app.use(cookieParser());
app.use(express.json());
app.use(
    urlencoded({
        extended:true,
    })
);





const corsOptions ={
    origin:process.env.FRONTEND_URL,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOptions));

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");


connectPassport();


// Importing the different routes

import userRoute from "./routes/user.js"
import orderRoute from "./routes/order.js"

app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);

// Using the Error Middleware

app.use(errorMiddleware);
export default app;
