import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
export const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)



