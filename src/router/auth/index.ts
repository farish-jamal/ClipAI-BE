import express from "express";
import { customizeUserSchema, loginSchema, signupSchema, updateUserSchema } from "../../validators";
import validateRequest from "../../middleware/validate_request";
import {
   handleUserSignup,
   handleCustomizeUser,
   handleUserLogin,
} from "../../controllers/auth/index";
import { isUser } from "../../middleware/validate_user";

const router = express.Router();

router.route("/signup").post(validateRequest(signupSchema), handleUserSignup);
router
   .route("/customize/user")
   .patch(isUser, validateRequest(customizeUserSchema), handleCustomizeUser);

router.route("/login").post(validateRequest(loginSchema), handleUserLogin);

export default router;
