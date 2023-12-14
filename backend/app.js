import express from "express";
import mongoose from "mongoose";
import invoiceRouter from "./routes/invoiceRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import paymentRouter from "./routes/paymentRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import clientRouter from "./routes/clientsRoutes.js";

dotenv.config();

// db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/clients",clientRouter);

const port  = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port`);
});
