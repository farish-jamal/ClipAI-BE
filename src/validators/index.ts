import { z } from "zod";

const signupSchema = z.object({
   email: z.string().email(),
   password: z.string().min(8).max(100),
   name: z.string().min(2).max(100),
});

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(8).max(100),
});

const customizeUserSchema = z.object({
   avatarUrl: z.string().url().optional(),
   prefferedVoice: z.string().optional(),
   prefferedStyle: z.string().optional(),
});

const updateUserSchema = z.object({
   avatarUrl: z.string().url().optional(),
   prefferedVoice: z.string().optional(),
   prefferedStyle: z.string().optional(),
   password: z.string().min(8).max(100).optional(),
   confirmPassword: z.string().min(8).max(100).optional(),
   name: z.string().min(2).max(100).optional(),
   preferredLanguage: z.string().optional(),
});

export { signupSchema, loginSchema, customizeUserSchema, updateUserSchema };
