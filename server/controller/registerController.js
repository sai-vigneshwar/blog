import express from "express"
import jwt from "jsonwebtoken"
import { register } from "../models/register.js"
import bcrypt from "bcrypt"
import { sendMail } from "./sendingMail.js"

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    const existingUser = await register.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already existed" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    const hashPassword = await bcrypt.hash(password, 10);
    await register.create({ username, email, password: hashPassword, otp, otp_expiry });

    await sendMail(email, "OTP for Registration", `Your OTP for registration is: ${otp}`);

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await register.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.otp !== otp || user.otp_expiry < Date.now()) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    user.otp = undefined;
    user.otp_expiry = undefined;
    await user.save();

    const token = jwt.sign({ userId: email }, process.env.JWT_SECRET);
    res.json({ success: true, token, username: user.username });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
