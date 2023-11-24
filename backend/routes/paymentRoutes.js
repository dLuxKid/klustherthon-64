import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import Payment from "../Models/Payment.js";

const paymentRouter = express.Router();

paymentRouter.get(
    "/all",
    expressAsyncHandler(async (req, res) => {
        try {
            const payments = Payment.find();
            res.status(200).send(payments)
        } catch (err) {
            res.status(400).send({
                message:"An error occured"
            })
        }
    })
)
paymentRouter.post(
    "/create",
    expressAsyncHandler(async (req,res)=>{
        try{
            const newPayment = new Payment({
                name:req.body.name,
                notes:req.body.notes,
                amount:req.body.amount

            });
            const payment = await newPayment.save();
            res.status(201).send({message:"New Payment Created"},payment);
        }catch(err){
            res.status(400).send({message:"Payment Creation Failed"});
        }
    })
)
paymentRouter.put(
    "/:id/update",
    expressAsyncHandler(async (req,res)=>{
        const payment = await Payment.findById(req.params.id);

        if(payment){
            try{
            payment.name = req.body.name;
            payment.notes = req.body.email;
            payment.amount = req.body.amount;
            
            const updatedPayment = await payment.save(); 
            res.status(201).send({message:"Payment Create Successfully."});
            }catch(err){
                res.status(400).send({message:"Payment Failed to update."});
            }
        }else{
            res.status(400).send({message:"Payment Not Found"})
        }
        
        
    })
)
export default paymentRouter;