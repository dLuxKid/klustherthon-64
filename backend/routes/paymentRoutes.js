import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import Payment from "../Models/Payment.js";
import Staff from "../Models/Staff.js";
import { isAuth, isBusiness } from "../utils.js";

const paymentRouter = express.Router();

paymentRouter.get(
  "/all",
  expressAsyncHandler(async (req, res) => {
    try {
      const payments = await Payment.find();
      res.status(200).send(payments);
    } catch (err) {
      res.status(400).send({
        message: "Error fetching payments",
      });
    }
  })
);

paymentRouter.get(
  "/all-business/:businessId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const payments = await Payment.find({
        business: req.params.businessId,
      });
      res.status(200).send(payments);
    } catch (err) {
      res.status(400).send({
        err: err,
        message: "Error fetching payments",
      });
    }
  })
);

paymentRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newPayment = new Payment({
        name: req.body.name,
        notes: req.body.notes,
        amount: req.body.amount,
        business: req.body.businessId,
      });
      const payment = await newPayment.save();
      res.status(201).send({ payment, message: "New Payment Created" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Payment Creation Failed" });
    }
  })
);

paymentRouter.put(
  "/:id/update",
  expressAsyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id);

    if (payment) {
      try {
        payment.name = req.body.name;
        payment.notes = req.body.notes;
        payment.amount = req.body.amount;
        payment.business = req.body.businessId;
        const updatedPayment = await payment.save();
        res
          .status(201)
          .send({ updatedPayment, message: "Payment Update Successfully." });
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Payment Failed to update." });
      }
    } else {
      res.status(400).send({ message: "Payment Not Found" });
    }
  })
);

paymentRouter.delete(
  "/delete",
  isAuth,
  // isBusiness,
  expressAsyncHandler(async (req, res) => {
    try {
      const staff = await Staff.findById(req.body.staffId);
      console.log(staff);
      if (staff && staff.business.toString() !== req.body.businessId) {
        return res.status(403).send({ message: "Unauthorized" });
      } else {
        await Staff.deleteOne({ _id: req.body.staffId });
        // await Staff.remove({ _id: req.body.staffId });
        return res.status(200).send({ message: "Payment Deleted" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "something went wrong" });
    }
  })
);
export default paymentRouter;
