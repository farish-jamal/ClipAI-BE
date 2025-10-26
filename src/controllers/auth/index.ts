import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/async_handler";
import ApiResponse from "../../utils/api_response";
import { createNewUserService, customizeUserService } from "../../services/auth";

export const handleUserSignup = asyncHandler(
   async (req: Request, res: Response): Promise<Response> => {
      const { email, password, name } = req.body;

      const response = await createNewUserService(email, password, name);

      if (!response.success) {
         return res.status(200).json(new ApiResponse(response.statusCode, null, response.message));
      }

      return res.status(201).json(new ApiResponse(201, response.data, response.message));
   }
);

export const handleCustomizeUser = asyncHandler(
   async (req: Request, res: Response): Promise<Response> => {
      const { avatarUrl, prefferedVoice, prefferedStyle } = req.body;

      const user = req.user as { userId: string; email: string };
      const id = user.userId;

      const response = await customizeUserService(id, avatarUrl, prefferedVoice, prefferedStyle);

      if (!response.success) {
         return res.status(200).json(new ApiResponse(response.statusCode, null, response.message));
      }

      return res.status(200).json(new ApiResponse(200, response.data, response.message));
   }
);
