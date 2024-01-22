import { Response } from "express";

const badRequest = (res: Response, data: any) => {
  return res.status(400).json({
    status: 400,
    data,
    message: data[0].msg,
  });
};

const unauthorized = (res: Response, data: any) => {
  return res.status(403).json({
    status: 403,
    data,
    message: data,
  });
};

export { unauthorized, badRequest };
