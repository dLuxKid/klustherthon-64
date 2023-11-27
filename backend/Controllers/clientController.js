import expressAsyncHandler from "express-async-handler";
import Client from "../Models/Clients.js";

export const allBusiness = expressAsyncHandler(async (req, res) => {
  try {
    const clients = await Client.find({
      business: req.params.id,
    });
    if (clients) {
      res.status(200).send(clients);
    } else {
      res.status(400).send(
        {},
        {
          message: "No Client was found for this Business",
        }
      );
    }
  } catch (err) {
    res.status(400).send(
      {},
      {
        message: "An error occured",
      }
    );
  }
});

export const createClient = expressAsyncHandler(async (req, res) => {
  try {
    const newClient = await Client({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      business: req.body.businessId,
    });
    const client = await newClient.save();
    res.status(201).send({
      message: "Client created succesfully!",
    });
  } catch (err) {
    res.status(400).send({
      message: "An error occured",
    });
  }
});

export const updateClient = expressAsyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  try {
    if (client) {
      (client.name = req.body.name),
        (client.email = req.body.email),
        (client.phoneNumber = req.body.phoneNumber),
        (client.address = req.body.address);

      const updatedClient = await client.save();
      res.status(201).send({
        message: "Client updated succesfully",
      });
    } else {
      res.status(400).send({
        message: "An error occured",
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "An error occured",
    });
  }
});
