import express from "express";
//  import user model
import bcrypt from "bcryptjs";
import { generateToken, isAuth, isBusiness } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import Business from "../Models/Business.js";
import {
  allStaff,
  businessSignin,
  businessSignup,
  unVerifyStaff,
  verifyStaff,
} from "../Controllers/businessController.js";
import {
  getBusinessStaff,
  staffSignin,
  staffSignup,
} from "../Controllers/staffController.js";

const userRouter = express.Router();

userRouter.post("/business/signup", businessSignup);

userRouter.post("/business/signin", businessSignin);
userRouter.put(
  "/business/profile",
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    // this will update business
  })
);
userRouter.get(
  "/business/all-staff/:businessId",
  isAuth,
  isBusiness,
  getBusinessStaff
);
userRouter.put("/business/verify-staff", isAuth, isBusiness, verifyStaff);
userRouter.put("/business/unverify-staff", isAuth, isBusiness, unVerifyStaff);

userRouter.post("/staff/signup", staffSignup);
userRouter.post("/staff/signin", staffSignin);
userRouter.put(
  "/staff/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // this will update Staff profile
  })
);

export default userRouter;
