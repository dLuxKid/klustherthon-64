import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
        },
        client:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Client",
            required:true
        },
        clientEmail:{
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        paymentStatus: {
            type: Boolean,
            required: true
        },
        paymentType: {
            type: Number,
            required: true
        },
        paymentInterval:{
            type:Number,
            required:true
        },
        installmentalAmount:{
            type:Number,
            required:false
        },
        nextPayment:{
            type:Date,
            required:false
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
        }
    }, {
        timestamps: true
    }

)

const Invoice  = mongoose.model("Invoice",invoiceSchema);

export default Invoice;