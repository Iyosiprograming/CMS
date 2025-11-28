import mongoose from "mongoose";


const ownerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passcode: { type: String, required: true }
})

const OwnerModel = mongoose.model("Owner", ownerSchema)
export default OwnerModel