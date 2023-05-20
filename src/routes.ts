import { Router, Request, Response } from "express";

const ExpressRouter = Router();

ExpressRouter.get('', (req: Request, res: Response) => {
    res.send('Server OK.');
});

export default ExpressRouter;