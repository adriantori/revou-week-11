import { Request, Response, NextFunction } from "express";

export const mockAuthMiddleware = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const mockRes: Response = res as Response;
    mockRes.locals = { userId: 1 }; // Set the userId as needed
    next();
  };
};
