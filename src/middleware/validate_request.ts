import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateRequest =
   (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
      try {
         req.body = schema.parse(req.body);
         next();
      } catch (err: any) {
         return res.status(400).json({
            success: false,
            errors: err.errors,
         });
      }
   };

export default validateRequest;
