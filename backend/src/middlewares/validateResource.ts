import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export default function validateResource(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      return res.status(400).json({
        status: "fail",
        message: error.errors,
      });
    }
  };
}
