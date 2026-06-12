import { Router } from "express";
import { me, registerUser } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { logoutUser } from "../controllers/auth.controller.js";
import { registerUserValidationRules } from '../middlewares/validation.middleware.js'
export const authRouter = Router()

authRouter.post('/register', registerUserValidationRules, registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)
authRouter.get('/me/:id', me)



