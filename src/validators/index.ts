import { z } from "zod";
import { ta } from "zod/v4/locales";

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
   preferredVoice: z.string().optional(),
   preferredStyle: z.string().optional(),
   password: z.string().min(8).max(100).optional(),
   confirmPassword: z.string().min(8).max(100).optional(),
   name: z.string().min(2).max(100).optional(),
   preferredLanguage: z.string().optional(),
});

const generateResponseSchema = z.object({
    prompt: z.string().min(10),
    length: z.number().min(1).max(300),
    preferredStyle: z.string().optional(),
    preferredVoice: z.string().optional(),
    preferredLanguage: z.string().optional(),
    targetAudience: z.string().optional(),
    contentGoal: z.string().optional(),
    keyPoints: z.array(z.string()).optional(),
});

export { signupSchema, loginSchema, customizeUserSchema, updateUserSchema, generateResponseSchema };
