import express from "express"
import jwt from "jsonwebtoken"
import { register } from "../models/register.js"
import bcrypt from "bcrypt"

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    const existingUser = await register.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already existed" });
    }
    const hashPassword=await bcrypt.hash(password,10)
    const newUser = await register.create({ username, email, password:hashPassword });
    const token = jwt.sign({ userId: email }, process.env.JWT_SECRET);

    res.json({ success: true, token,username });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
