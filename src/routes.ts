import { Router, Request, Response } from "express";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    res.send('Server OK.');
});

export default router;