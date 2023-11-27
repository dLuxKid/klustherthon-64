import express from "express";
import expressAsyncHandler from "express-async-handler";
import Invoice from "../Models/Invoice.js";
import Staff from "../Models/Staff.js";
import Client from "../Models/Clients.js";
import { isAuth } from "../utils.js";
import {
  allBusiness,
  allClient,
  createInvoice,
  updateInvoice,
} from "../Controllers/invoiceController.js";
// import {generateToken,isAuth} from "..utils.js";
const invoiceRouter = express.Router();

invoiceRouter.get("/all-business/:id", isAuth, allBusiness);
invoiceRouter.get("/allClient/:id", isAuth, allClient);
invoiceRouter.post("/create", isAuth, createInvoice);
invoiceRouter.put("/update/:id", isAuth, updateInvoice);

export default invoiceRouter;
