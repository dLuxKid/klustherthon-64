import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        type: required
    },
    email: {
        type: String,
        type: required
    },
    staffId: {
        type: String,
        type: required,
    },
    email: {
        type: String,
        type: required,
        unique: true
    },
    staffId: {
        type: String,
        required:true,
        unique: true
    },
    department: {
        type: String,
        required:true,
    },
    staffId: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    preferredUsername: {
        type: String,
        required:true,
    },
    managerName: {
        type: String,
        required:true,
    },
    isBusiness: {
        type: String,
        type: required
    },
    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Business",
        required:true
    }
})

const Staff = mongoose.model("Staff",staffSchema);

export default Staff;