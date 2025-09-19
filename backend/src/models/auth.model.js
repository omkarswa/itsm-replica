import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true ,
        trim:true ,
    },
    email:{
        type:String,
        required:true,
        trim:true ,
        unique:true ,
    },
    password:{ 
        type: String, 
        required: true, 
        minlength: 6 
    },
    role:{ 
        type: String, 
        enum: ["admin", "hr", "manager", "employee"], 
        default: "employee" 
    },
})

export default mongoose.model("User" ,userSchema);