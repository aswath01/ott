import { jwt } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import dotenv from "dotenv";
import { unauthorized } from "../responses/errorResponse";
dotenv.config();

// Validating the token sent by the user
const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const secretKey = process.env.JWT_SECRET_KEY as string;

  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization?.split(" ");
    if (token.length !== 2) return unauthorized(res, "Invalid token format");

    jwt.verify(token[1], secretKey, (err: Error, decoded: any) => {
      if (err) {
        return unauthorized(res, "Error while parsing token");
      } else {
        if (!decoded) {
          return unauthorized(res, "Cannot decode token");
        }
        req.userId = decoded;
        console.log({ decoded });
        // req.user = decoded;
        // req.user.org = decoded.organisation;
        next();
      }
    });
  } else {
    return unauthorized(res, "Token not found");
  }
};

export default verifyToken;
