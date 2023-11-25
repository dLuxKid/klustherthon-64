import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;