import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import Payment from "../Models/Payment.js";
import { isBusiness } from "../utils.js";

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
paymentRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    try {
      const newPayment = new Payment({
        name: req.body.name,
        notes: req.body.notes,
        amount: req.body.amount,
        business:req.body.businessId
      });
      const payment = await newPayment.save();
      res.status(201).send({ payment, message: "New Payment Created" });
    } catch (err) {
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
        res.status(400).send({ message: "Payment Failed to update." });
      }
    } else {
      res.status(400).send({ message: "Payment Not Found" });
    }
  })
);
paymentRouter.delete(
    "/delete",
    isBusiness,
    expressAsyncHandler(async (req, res) => {
        try {
            const staff = await Staff.findById(staffId);
        
            if (staff.business.toString() !== businessId) {
              return res.status(403).send({ message: "Unauthorized" });
            }else{
                await staff.remove();
                return res.status(200).send({ message: "Payment Deleted" });
            }
        }catch(err){

        }
    
    })
)
export default paymentRouter;
