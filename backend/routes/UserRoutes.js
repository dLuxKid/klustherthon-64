import express from "express"
//  import user model 
import bcrypt from 'bcryptjs';
// import {generateToken,isAuth} from "..utils.js";
import expressAyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.post(
    "/signin",
    expressAyncHandler(async(req,res)=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                res.send({
                    //all necessary user data in Json
                });
                return;
            }
            
        }
        res.status(401).send({message:"Invalid email or password"})
    })
);
userRouter.post(
    "/signup/business",
    expressAyncHandler(async(req,res)=>{
        const newUser = new Business({
            //all business data
        })
    })
)
userRouter.post(
    "/signup/staff",
    expressAyncHandler(async(req,res)=>{
        const newUser = new Staff({
            //all business data
        })
        res.send(200).send({message:"User Created"})
    })
);
userRouter.put(
    "/profile",
    // isAuth,
    expressAyncHandler(async(req,res)=>{
        // this will update business and staff
    })
)

export default userRouter