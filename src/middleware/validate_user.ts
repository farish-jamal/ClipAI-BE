import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api_response";
import jwt from "jsonwebtoken";
import { findUserById } from "../repository/auth";

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
         return res
            .status(401)
            .json(new ApiResponse(401, null, "User not authorized to access this resource"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
         userId: string;
         email: string;
      };

      const user = await findUserById(decoded.userId);
      if (!user) {
         return res
            .status(401)
            .json(new ApiResponse(401, null, "User not authorized to access this resource"));
      }

      req.user = { userId: decoded.userId, email: decoded.email };
      next();
   } catch (error) {
      return res
         .status(401)
         .json(new ApiResponse(401, null, "User not authorized to access this resource"));
   }
};
