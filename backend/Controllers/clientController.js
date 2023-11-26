import expressAsyncHandler from "express-async-handler";
import Client from "../Models/Clients";

export const allBusiness = expressAsyncHandler(async (req, res) => {
    try {
        const clients = await Client.find({
            business: req.params.id
        })
        if (clients) {
            res.status(200).send(clients);
        } else {
            res.status(400).send({}, {
                message: "No Client was found for this Business"
            });
        }
    } catch (err) {
        res.status(400).send({}, {
            message: "An error Occured"
        });
    }
})