import express from "express";
import { generateResponseSchema } from "../../validators";
import validateRequest from "../../middleware/validate_request";
import { isUser } from "../../middleware/validate_user";
import { handleGenerateResponse } from "../../controllers/response";

const router = express.Router();

router
   .route("/generate")
   .post(isUser, validateRequest(generateResponseSchema), handleGenerateResponse);

export default router;
