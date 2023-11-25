import express from "express";
import mongoose from "mongoose";
import invoiceRouter from "./routes/invoiceRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import paymentRouter from "./routes/paymentRoutes.js";
import userRouter from "./routes/UserRoutes.js";

dotenv.config();

// db connection
mongoose
  .connect(
    "mongodb+srv://vj2k02:rdGddQmuY76qc5aC@klusterthon-64.pf8rfmj.mongodb.net/?retryWrites=true&w=majority"
  )
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

app.listen(5000, () => {
  console.log("App listening on port 5000!");
});
