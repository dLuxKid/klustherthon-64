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
app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});
app.use("/api/users", userRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/clients",clientRouter);
app.listen(5000, () => {
  console.log("App listening on port 5000!");
});
