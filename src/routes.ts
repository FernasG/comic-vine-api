import { Router, Request, Response } from "express";
import { VolumesLoader } from "./loaders";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await VolumesLoader();

    res.send('Server OK.');
});

export default router;