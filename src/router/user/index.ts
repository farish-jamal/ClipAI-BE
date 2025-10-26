import express from "express";
import { updateUserSchema } from "../../validators";
import validateRequest from "../../middleware/validate_request";
import { isUser } from "../../middleware/validate_user";
import { handleEditUser } from "../../controllers/user";

const router = express.Router();

router.route("/update/user").patch(isUser, validateRequest(updateUserSchema), handleEditUser);

export default router;
