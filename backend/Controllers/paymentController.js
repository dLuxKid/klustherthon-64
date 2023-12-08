import expressAsyncHandler from "express-async-handler";
import Payment from "../Models/Payment.js";

export const getAllPayments = expressAsyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).send(payments);
  } catch (err) {
    res.status(400).send({
      message: "Error fetching payments",
    });
  }
});

export const getBusinessPayments = expressAsyncHandler(async (req, res) => {
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
});

export const createPayment = expressAsyncHandler(async (req, res) => {
  try {
    const newPayment = new Payment({
      name: req.body.name,
      notes: req.body.notes,
      amount: req.body.amount,
      business: req.body.businessId,
    });
    const payment = await newPayment.save();
    res.status(201).send({
      payment,
      message: "New Payment Created",
    });
  } catch (err) {
    res.status(400).send({
      message: "Payment Creation Failed",
    });
  }
});

export const updatePayment = expressAsyncHandler(async (req, res) => {
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
});

export const deletePayment = expressAsyncHandler(async (req, res) => {
  try {
    const payment = await Payment.deleteOne({ _id: req.params.id });
    if (payment) {
      return res.status(200).send({ message: `Payment Deleted` });
    } else {
      return res.status(400).send({ message: `Payment does not exist` });
    }
  } catch (err) {
    res.status(400).send({ message: "something went wrong" });
  }
});
