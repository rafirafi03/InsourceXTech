import { Request, Response } from "express";
import { HttpStatusCode } from "../constants/HttpStatusCodes";
import Admin from "../models/adminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashPass, verifyPass } from "../utils/passwordService";
import { sendEmail } from "../utils/emailServices";

export const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });

    if (admin) {
      // Compare entered password with hashed password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        console.log("no match");
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ success: false, error: "Invalid credentials" });
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

    res
      .status(HttpStatusCode.OK)
      .json({ success: true, message: "logout successfull" });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error logout" });
  }
};

export const ChangePass = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, currentPass, newPass } = req.body;
    console.log("req.body:", req.body);

    const admin = await Admin.findById({ _id: id });

    if (!admin) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ success: false, message: "No admin found with this id" });
      return;
    }

    const isPassValid = await verifyPass(currentPass, admin.password);

    if (!isPassValid) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ success: false, message: "incorrect password" });
      return;
    }

    const hashedPass = await hashPass(newPass);

    admin.password = hashedPass;

    await admin.save();

    res
      .status(HttpStatusCode.OK)
      .json({ success: true, message: "Password changed successfull" });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error changing pass" });
  }
};

export const ForgetPasswordRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    console.log("admin:0", admin);

    if (!admin) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ success: false, message: "No admin found with this id" });
      return;
    }

    const token = jwt.sign(
      { email: admin.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    const subject = "click the link to reset you password";
    const message = `click here ${process.env.FRONTEND_URL}/resetPassword/${token}`;

    await sendEmail({
      from: process.env.EMAIL_TO || 'info@insourcextech.com',
      to: process.env.MAIL_TO || "ahamedrafirafi03@gmail.com",
      subject: subject,
      text: message,
    });

    res
      .status(HttpStatusCode.OK)
      .json({ success: true, message: "Password changed successfull" });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error changing pass" });
  }
};


export const ResetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'insourcextech');
    const { email } = decoded as { email: string };

    const admin = await Admin.findOne({email})

    if(!admin) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: 'no mail id found'})
      return
    }

    const hashedPass = await hashPass(password);

    admin.password = hashedPass;

    await admin.save()


    res
      .status(HttpStatusCode.OK)
      .json({ success: true, message: "Password changed successfull" });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error changing pass" });
  }
};
