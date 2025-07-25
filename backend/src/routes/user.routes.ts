import { Router } from "express";
import { registerUserHandler } from "../controllers/user.controller";
import { createUserSchema } from "../schemas/user.schema";
import validateResource from "../middlewares/validateResource";

const router = Router();

router.post(
  "/register",
  validateResource(createUserSchema),
  registerUserHandler
);

export default router;
