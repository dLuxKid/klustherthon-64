import express from "express";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getBusinessPayments,
  updatePayment,
} from "../Controllers/paymentController.js";
import { isAuth, isBusiness } from "../utils.js";

const paymentRouter = express.Router();

paymentRouter.get("/all", isAuth, getAllPayments);

paymentRouter.get("/all-business/:businessId", isAuth, getBusinessPayments);

paymentRouter.post("/create", isAuth, createPayment);

paymentRouter.put("/:id/update", isAuth, updatePayment);

paymentRouter.delete("/delete/:id", isAuth, isBusiness, deletePayment);

export default paymentRouter;
