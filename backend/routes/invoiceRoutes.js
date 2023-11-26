import express from "express";
import expressAsyncHandler from "express-async-handler";
import Invoice from "../Models/Invoice.js";
import Staff from "../Models/Staff.js";
// import {generateToken,isAuth} from "..utils.js";
const invoiceRouter = express.Router();

invoiceRouter.get(
    '/all',
    // isAuth,
    expressAsyncHandler(async(req,res)=>{
        console.log("here");
    })
)
invoiceRouter.post(
    '/create',
    expressAsyncHandler(async(req,res)=>{
        try{
            const staff = Staff.findOne({email:req.body.email})
            const newInvoice = new Invoice({
                title:req.body.title,
                staff:req.body.staff,
                amount:req.body.amount,
                paymentStatus:req.body.paymentStatus,
                paymentType:req.body.paymentType,
                installmentalAmount:req.body.installmentalAmount,
                business:req.body.businessId
            })
            console.log(newInvoice);
            const invoice = await newInvoice.save();
        res.status(201).send({
            message:"New Invoice Created"
        })
        }catch(err){
            res.status(400).send({
                message:"An error occured"
            })
        }
       
    })

    
)

export default invoiceRouter;