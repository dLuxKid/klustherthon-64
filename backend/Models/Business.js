import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    businessName:{type:String,required:true},
    businessType:{type:String,required:true},
    businessRegNo:{type:String,required:true,unique:true},
    businessRegistration:{type:String,required:true},
    industry:{type:String,required:true},
    administratorFullName:{type:String,required:true},
    administratorPosition:{type:String,required:true},
    administratorEmail:{type:String,required:true},
    administratorPhoneNo:{type:String,required:true},
    desiredUsername:{type:String,required:true},
    password:{type:String,required:true},
    isBusiness:{type:Boolean,required:true}
})

const Business =  mongoose.model("Business", businessSchema);

export default Business;