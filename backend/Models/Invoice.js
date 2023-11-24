import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        email: {
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
        }
    }, {
        timestamps: true
    }

)

const Invoice  = mongoose.model("Invoice",invoiceSchema);

export default Invoice;