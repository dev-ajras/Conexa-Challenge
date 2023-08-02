import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/User";
import { messages } from "../constants/messages";

const verifyToken = (token: string): Promise<IUser | null> => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT!) as JwtPayload;
      resolve(decoded as IUser);
    } catch (err) {
      reject(err);
    }
  });
};

export const authMiddleware = (requiredRole?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: messages.TOKEN_REQUIRED });
    }

    try {
      const user = await verifyToken(token);
      if (!user) {
        return res.status(403).json({ error: messages.INVALID_TOKEN });
      }

      if (
        (requiredRole === "admin" && !user.isAdmin) ||
        (requiredRole !== "admin" && user.isAdmin)
      ) {
        return res.status(403).json({ error: messages.UNAUTHORIZED });
      }

      res.locals.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ error: messages.INVALID_TOKEN });
    }
  };
};
