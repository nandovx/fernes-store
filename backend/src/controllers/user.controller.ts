import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { createUserSchema } from "../schemas/user.schema";

export async function registerUserHandler(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const user = await createUser({ name, email, password });

    return res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        status: "fail",
        message: "Email already exists",
      });
    }
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
