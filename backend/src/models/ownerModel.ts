import mongoose, { Schema, Document } from "mongoose";

interface Owner extends Document {
  name: string;
  password: string;
  passcode: string;
  email: string;
}

const ownerSchema = new Schema<Owner>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  passcode: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const OwnerModel = mongoose.model<Owner>("Owner", ownerSchema);

export default OwnerModel;
