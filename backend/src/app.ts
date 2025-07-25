import express from "express";
import { PrismaClient } from "./generated/prisma/client";
import userRoutes from "./routes/user.routes";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

export { app, prisma };
