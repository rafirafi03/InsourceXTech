import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../constants/HttpStatusCodes";

interface AuthenticatedRequest extends Request {
  user?: any; // Attach user information to the request object
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.adminToken; // Retrieve token from cookies

  if (!token) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: No token provided" });
      return
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");

    // Attach decoded user data to request
    req.user = decoded;

    next(); // Proceed to next middleware
  } catch (err) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
