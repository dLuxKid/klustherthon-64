import express from "express";
import { allBusiness, createClient, updateClient } from "../Controllers/clientController.js";
import { isAuth } from "../utils.js";

const clientRouter = express.Router();

clientRouter.get(
    "/all-business/:id",
    isAuth,
    allBusiness
)
clientRouter.post(
    "/create",
    isAuth,
    createClient
)
clientRouter.put(
    "/profile/:id",
    isAuth,
    updateClient
)

export default clientRouter;