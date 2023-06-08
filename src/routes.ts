import { Router, Request, Response } from "express";
import { SuperPowerLoader } from "./loaders";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await SuperPowerLoader();

    res.send('Server OK.');
});

export default router;