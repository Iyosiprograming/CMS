import mongoose from "mongoose";

interface IOwner {
    name: string;
    email: string;
    password: string;
    passcode: string;
}

const ownerSchema = new mongoose.Schema<IOwner>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passcode: { type: String, required: true }
},
    {
        timestamps: true
    });

export default mongoose.model<IOwner>("Owner", ownerSchema);