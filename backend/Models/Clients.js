import mongoose, { Schema } from "mongoose";

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String
    },
    address:{
        type:String
    },
    business:{
        type:mongoose.Schema.ObjectId,
        ref:"Business",
        required:true
    }
})

const Client = mongoose.model("client",clientSchema);

export default Client;
