import fs from "fs";
import path from "path";
import express, { Application, Request, Response } from "express";
import cors from "cors";

import userRouter from "./router/auth/index";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
   res.send("API is working!");
});

// Load all routes dynamically
app.use("/api/v1/users", userRouter);

export default app;
