import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  otp_expiry: { type: Date }
});

export const register = mongoose.model("register", registerSchema);
