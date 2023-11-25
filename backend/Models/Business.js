import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    businessType: {
        type: String,
        required: true
    },
    businessRegNo: {
        type: String,
        required: true,
        unique: true
    },
    businessAddress: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    administratorFullName: {
        type: String,
        required: true
    },
    administratorPosition: {
        type: String,
        required: true
    },
    administratorEmail: {
        type: String,
        required: true,
        unique:true
    },
    administratorPhoneNo: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isBusiness: {
        type: Boolean,
        required: true
    }
})

const Business = mongoose.model("Business", businessSchema);

export default Business;