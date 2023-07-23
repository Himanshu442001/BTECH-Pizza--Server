import express from "express";

import passport from "passport";
import { 
  getAdminStats, 
  getAdminUsers,  
  logout, myProfile 
} from "../controllers/user.js";
import {
   authorizedAdmin,
    isAuthenticated
} from "../middleware/auth.js";

const Router = express.Router();

Router.get("/googlelogin", passport.authenticate("google",{
    scope:["profile"]
}));


Router.get("/login",
passport.authenticate("google" , 

   { scope:["profile"]}),


(req,res,next)=>{
    res.send("Logged In");
}
);


// Router.get(
//     "/login",
//     passport.authenticate("google", {
//       scope:["profile"],
//       successRedirect: process.env.FRONTEND_URL,
//     })
// );

Router.get("/me",
isAuthenticated, 
myProfile);

Router.get("/logout", logout );

Router.get("/admin/users", isAuthenticated, authorizedAdmin,getAdminUsers);
Router.get("/admin/stats", isAuthenticated, authorizedAdmin, getAdminStats);

export default Router;