import { Request, Response } from 'express';
import { HttpStatusCode } from "../constants/HttpStatusCodes";
import Admin from "../models/adminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });

    if (admin) {
      // Compare entered password with hashed password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        console.log("no match");
        res.status(HttpStatusCode.UNAUTHORIZED).json({ success: false, error: "Invalid credentials" });
        return;
      }

      const token = jwt.sign(
        { userId: admin._id },
        process.env.JWT_SECRET || "defaultSecret",
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } as jwt.SignOptions
      );
  
      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000,
      });
  
      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: "Login successfull",
        token,
        admin,
      });
    } 
    // else {
    //   // Create new admin if not found
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   admin = new Admin({ email, password: hashedPassword });
    //   await admin.save();
    // }

    // Generate token
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error logging in user" });
  }
};


export const Logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.setHeader("Set-Cookie", [
        "adminToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 UTC",
      ]);

      res.status(HttpStatusCode.OK).json({success: true, message: 'logout successfull'})
    
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error logout" });
  }
};


