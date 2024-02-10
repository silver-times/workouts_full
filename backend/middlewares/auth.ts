import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { prisma } from "../config/database";

type RequestExt = Request & { payload?: number };

dotenv.config();

export const auth = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token)
      return res.status(401).json({ error: "You are not authenticated!" });

    token = token.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "You are not authenticated!" });
    }
    req.payload = user.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "You are not authenticated." });
  }
};
