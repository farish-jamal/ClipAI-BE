import express from "express";
import { customizeUserSchema, signupSchema } from "../../validators";
import validateRequest from "../../middleware/validate_request";
import { handleUserSignup, handleCustomizeUser } from "../../controllers/auth/index";

const router = express.Router();

router.route("/signup").post(validateRequest(signupSchema), handleUserSignup);
router.route('/customize/user').patch(validateRequest(customizeUserSchema), handleCustomizeUser);

export default router;
