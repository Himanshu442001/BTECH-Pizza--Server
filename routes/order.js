import express from "express";


import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";
import { getAdminOrders, getMyOrders, getOrderDetails, paymentVerification, placeOrder,  placeOrderOnline, processOrder } from "../controllers/order.js";

const Router = express.Router();

Router.post("/createorder"
,isAuthenticated
,placeOrder); 

Router.post("/createorderonline",isAuthenticated, placeOrderOnline);
Router.post("/paymentverification"
,isAuthenticated
,paymentVerification);




Router.get("/myorders",
isAuthenticated,
getMyOrders );

Router.get("/order/:id",
isAuthenticated,
getOrderDetails );


// add admin middleware
Router.get("/admin/orders",
isAuthenticated,
authorizedAdmin,
getAdminOrders );

Router.get("/admin/order/:id",
isAuthenticated,
authorizedAdmin,
processOrder );



export default Router;