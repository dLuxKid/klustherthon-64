import express from "express";
import {
  allBusiness,
  allClient,
  createInvoice,
  updateInvoice,
} from "../Controllers/invoiceController.js";
import { isAuth } from "../utils.js";
// import {generateToken,isAuth} from "..utils.js";
const invoiceRouter = express.Router();

invoiceRouter.get("/all-business/:id", isAuth, allBusiness);
invoiceRouter.get("/allClient/:id", isAuth, allClient);
invoiceRouter.post("/create", isAuth, createInvoice);
invoiceRouter.put("/update/:id", isAuth, updateInvoice);

export default invoiceRouter;
