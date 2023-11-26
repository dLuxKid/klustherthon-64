import express from "express";
import { allBusiness } from "../Controllers/clientController";

const clientRouter = express.Router();

clientRouter.get(
    "/all-business/:id",
    isAuth,
    allBusiness
)