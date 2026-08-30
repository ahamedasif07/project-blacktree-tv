import compression from "compression";
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import { toNodeHandler } from "better-auth/node";
import { errorMiddleware } from "./apps/middleware/error.middleware";
import { auth } from "./apps/modules/auth/auth.config";
import config from "./config";
import routes from "./routes";
import { AppError } from "./utils/AppError";

const app = express();

app.set("trust proxy", config.nodeEnv === "production" ? 1 : false);

// 1. Security & Optimization Middleware
app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: config.cors.origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Logging
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

// 3. Auth Routes - PRIORITY 1: Custom Handlers

app.all("/api/auth/*splat", toNodeHandler(auth));

// 5. Rate Limiting
const limiter = rateLimit({
  max: config.rateLimit.maxRequests,
  windowMs: config.rateLimit.windowMs,
  message: "Too many requests from this IP, please try again later!",
});
app.use("/api", limiter);

// 6. API Routes
app.use("/api/v1", routes);

app.get("/health", (_: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// 7. Error Handling
app.all("/{*splat}", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `Cannot find ${req.method} ${req.originalUrl} on this server!`,
      404,
    ),
  );
});

app.use(errorMiddleware);

export default app;
