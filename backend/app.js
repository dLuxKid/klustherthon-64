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

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});
app.use("/api/users", userRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/clients", clientRouter);

const port = process.env.PORT;
app.options("*", cors());

app.listen(5000, () => {
  console.log(`App listening on port 5000`);
});
