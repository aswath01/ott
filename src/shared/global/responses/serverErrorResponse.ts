import { Response } from "express";

/**
 *
 * @param {Response} res
 * @param {any} data
 * @returns {Response} 500
 */
const internalServerResponse = (res: Response, data: any): Response => {
  return res.status(500).json({
    status: false,
    data,
    message: data,
  });
};

export { internalServerResponse };
