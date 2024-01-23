import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { unauthorized } from "../responses/errorResponse";

dotenv.config();

interface ExtendedRequest extends Request {
  user?: { name: string; role: string };
}

const verifyToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const secretKey = "AIzaSyBtGuIOhOR6D1difgbeaPQtLtHYwwGe5wM";
    const authorization = req.headers.authorization;

    if (authorization) {
      const decoded = jwt.verify(authorization, secretKey) as
        | { name: string; role: string }
        | undefined;

      if (!decoded) {
        return unauthorized(res, "Cannot decode token");
      }

      req.user = decoded;
      next();
    } else {
      return unauthorized(res, "Token not found");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return unauthorized(res, `Error while verifying token: ${error}`);
  }
};

export default verifyToken;
