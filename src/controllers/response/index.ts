import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async_handler";
import ApiResponse from "../../utils/api_response";
import { generateResponseService } from "../../services/response";

export const handleGenerateResponse = asyncHandler(
   async (req: Request, res: Response): Promise<Response> => {
      const user = req.user as { userId: string; email: string };
      const id = user.userId;

      const response = await generateResponseService(id, req.body);

      if (!response.success) {
         return res.status(200).json(new ApiResponse(response.statusCode, null, response.message));
      }
      return res.status(200).json(new ApiResponse(200, response.data, response.message));
   }
);
