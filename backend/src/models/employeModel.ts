import mongoose from "mongoose";

const employeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["manager", "staff", "intern"],
        default: "staff"
    },
    salary:{
        type: Number,
        required: true
    },
    employeContract:{
        type:String,
        required: true,
        enum: ["full-time", "part-time", "contract"]
    },
    employeStatus:{
        type: String,
        enum: ["active", "inactive", "vacation","sick leave",],
        default: "active"
    }
})

const Employe = mongoose.model("Employe", employeSchema);

export default Employe;