import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import Payment from "../Models/Payment.js";
import Staff from "../Models/Staff.js";
import { isAuth, isBusiness } from "../utils.js";
import Business from "../Models/Business.js";
import { createPayment, deletePayment, getAllPayments, getBusinessPayments, updatePayment } from "../Controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.get(
  "/all",
  isAuth,
  getAllPayments
);

paymentRouter.get(
  "/all-business/:businessId",
  isAuth,
  getBusinessPayments
);

paymentRouter.post(
  "/create",
  isAuth,
  createPayment
);

paymentRouter.put(
  "/:id/update",
  isAuth,
  updatePayment
);

paymentRouter.delete(
  "/delete/:id",
  isAuth,
  isBusiness,
  deletePayment
);
export default paymentRouter;
