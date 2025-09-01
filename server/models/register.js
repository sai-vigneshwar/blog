import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export const register = mongoose.model("register", registerSchema);
