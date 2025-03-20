// src/app.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

connectDB()

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["https://www.insourcextech.com", "https://insourcextech.com", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));  


// Routes
app.use("/api", routes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not founded" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("error:", err.message, err.stack);
  res
    .status(500)
    .json({
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

export default app;
