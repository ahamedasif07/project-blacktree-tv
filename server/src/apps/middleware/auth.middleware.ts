import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../modules/auth/auth.config";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validating session...");
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    console.warn("No session found in protect middleware");
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  console.log("Session found for user:", session.user.id);

  req.user = session.user as any;
  req.session = session.session as any;

  next();
});


export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req.user as any)?.role;
    
    if (!userRole || !roles.includes(userRole)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }

    next();
  };
};
