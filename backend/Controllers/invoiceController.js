import express from "express-async-handler";
import Invoice from "../Models/Invoice.js";
import Client from "../Models/Clients.js";
import expressAsyncHandler from "express-async-handler";

export const allBusiness = expressAsyncHandler(async (req, res) => {
  try {
    const invoices = await Invoice.find({
      business: req.params.id,
    });
    if (invoices) {
      res.status(200).send(invoices);
    } else {
      res.status(400).send({
        message: "No Invoices was found for this Business",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "An error occured",
    });
  }
});

export const allClient = expressAsyncHandler(async (req, res) => {
  try {
    const invoices = await Invoice.find({
      client: req.params.id,
    });
    if (invoices) {
      res.status(200).send(invoices);
    } else {
      res.status(400).send({
        message: "No Invoices was found for this Client",
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "An error occured",
    });
  }
});

export const createInvoice = expressAsyncHandler(async (req, res) => {
  try {
    const client = await Client.findOne({
      email: req.body.email,
    });

    if (client) {
      const newInvoice = new Invoice({
        title: req.body.title,
        staff: req.body.staffId,
        client: client._id,
        amount: req.body.amount,
        paymentInterval: req.body.paymentInterval,
        paymentStatus: req.body.paymentStatus,
        paymentType: req.body.paymentType,
        business: client.business,
      });

      if (req.body.paymentType == 2) {
        newInvoice.installmentalAmount = req.body.installmentalAmount;
        setNextPayment(newInvoice, req.body.paymentInterval, res);
      } else if (req.body.paymentType == 3) {
        setNextPayment(newInvoice, req.body.paymentInterval, res);
      }

      await newInvoice.save();
      res.status(201).send({
        message: "New Invoice Created",
      });
    } else {
      res.status(400).send(new Error("Client with such email was not found"));
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "An error occured",
    });
  }
});

export const updateInvoice = expressAsyncHandler(async (req, res) => {
  try {
    const client = await Client.findOne({
      _id: req.body.email,
    });

    const invoiceId = req.params.id;

    const existingInvoice = await Invoice.findById(invoiceId);

    if (!existingInvoice) {
      return res.status(404).send({ message: "Invoice not found" });
    }

    existingInvoice.title = req.body.title || existingInvoice.title;
    (existingInvoice.title = req.body.title),
      (existingInvoice.staff = req.body.staffId), // this can be either  staff or business administrator id
      (existingInvoice.client = client.id),
      (existingInvoice.amount = req.body.amount),
      (existingInvoice.paymentInterval = req.body.paymentInterval),
      (existingInvoice.paymentStatus = req.body.paymentStatus),
      (existingInvoice.paymentType = req.body.paymentType);

    if (req.body.paymentType !== existingInvoice.paymentType) {
      if (req.body.paymentType == 2) {
        existingInvoice.installmentalAmount =
          req.body.installmentalAmount || existingInvoice.installmentalAmount;
        setNextPayment(existingInvoice, req.body.paymentInterval);
      } else if (req.body.paymentType == 3) {
        setNextPayment(existingInvoice, req.body.paymentInterval);
      }
    }

    const updatedInvoice = await existingInvoice.save();

    res.status(200).send({
      message: "Invoice updated successfully",
      updatedInvoice,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while updating the invoice",
    });
  }
});

const setNextPayment = (newInvoice, paymentInterval, res) => {
  let nextPayment = new Date();

  if (paymentInterval == 1) {
    nextPayment.setDate(nextPayment.getDate() + 1);
    newInvoice.nextPayment = nextPayment;
  } else if (paymentInterval == 2) {
    nextPayment.setDate(nextPayment.getDate() + 7);
    newInvoice.nextPayment = nextPayment;
  } else if (paymentInterval == 3) {
    nextPayment.setMonth(nextPayment.getMonth() + 1);
    newInvoice.nextPayment = nextPayment;
  } else if (paymentInterval == 4) {
    nextPayment.setFullYear(nextPayment.getFullYear() + 1);
    newInvoice.nextPayment = nextPayment;
  } else {
    res.status(400).send({
      message: "Invalid Payment Interval",
    });
  }
};
