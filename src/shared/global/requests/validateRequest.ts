import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export class Requests {
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  public static validationRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = validationResult(req);
    if (result.isEmpty()) next();
    else res.status(400).json({ message: "Bad Request" });
  }
}
