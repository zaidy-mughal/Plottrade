import express, { Request, Response, NextFunction, Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import UserRoutes from "./routes/user.route.js";
import AuthRoutes from "./routes/auth.route.js";
import ListingRoutes from "./routes/listing.route.js";
import { CustomError } from "./utils/errorHandler.js";
import { loadEnvironment } from "./utils/loadSecrets.js";

async function startServer() {
  // 1. Await environment retrieval before reading process.env
  await loadEnvironment();

  const app: Application = express();

  // 2. Connect to MongoDB
  const dbConnectionString = process.env.DB_CONNECTION_STRING;
  if (!dbConnectionString) {
    console.error("Error: DB_CONNECTION_STRING is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbConnectionString);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }

  // 3. Configure CORS with freshly loaded CLIENT_URL
  const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",")
    : [];
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    }),
  );

  // 4. Standard middleware
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());

  // 5. Routes
  app.get("/api", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "PlotTrade API Server",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
    });
  });

  app.use("/api/user", UserRoutes);
  app.use("/api/auth", AuthRoutes);
  app.use("/api/listings", ListingRoutes);

  // 6. Error handling middleware
  app.use(
    (
      err: unknown,
      req: Request,
      res: Response,
      _next: NextFunction,
    ): Response => {
      console.error("Request error:", {
        method: req.method,
        path: req.originalUrl,
        error: err,
      });

      const statusCode =
        typeof err === "object" &&
        err !== null &&
        "statusCode" in err &&
        typeof err.statusCode === "number" &&
        err.statusCode >= 400 &&
        err.statusCode < 500
          ? err.statusCode
          : 500;

      const publicMessages: Record<number, string> = {
        400: "Invalid request.",
        401: "Authentication required.",
        403: "Access denied.",
        404: "Resource not found.",
        409: "Resource already exists.",
        422: "Request validation failed.",
      };

      return res.status(statusCode).json({
        success: false,
        statusCode,
        message:
          publicMessages[statusCode] || "An unexpected server error occurred.",
      });
    },
  );

  // 7. Start listening
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
}

startServer();
