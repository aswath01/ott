import { Response } from "express";

/**
 *
 * @param {Response} res
 * @param {any} data
 * @returns {Response} 200
 */
const response200 = (res: Response, data: any): Response => {
  return res.status(200).json({
    status: true,
    data,
  });
};

/**
 *
 * @param {Response} res
 * @param {any} data
 * @returns {Response} 201
 */
const createdResponse = (res: Response, data: any): Response => {
  return res.status(201).json({
    status: 201,
    data,
  });
};

/**
 *
 * @param {Response} res
 * @param {any} data
 * @returns {Response} 202
 * for long-running process
 */
const acceptedResponse = (res: Response, data: any): Response => {
  return res.status(202).json({
    status: 202,
    data,
  });
};

/**
 *
 * @param {Response} res
 * @param {any} data
 * @returns {Response} 204
 * for no content
 */
const noContentResponse = (res: Response, data: any): Response => {
  return res.status(204).json({
    status: 204,
    data,
  });
};

export { response200, createdResponse, acceptedResponse, noContentResponse };
