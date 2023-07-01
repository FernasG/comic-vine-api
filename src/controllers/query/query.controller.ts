import { Request, Response } from "express";
import { query } from "./query.service";

export const QueryController = {
    query: (async (req: Request, res: Response) => {
        const { query: queryParams } = req;

        const { statusCode, data } = await query(queryParams);

        return res.status(statusCode).json(data);
    })
};