import { Router, Request, Response } from "express";
import { EditorsVolumesLoader } from "./loaders";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await EditorsVolumesLoader();

    res.send('Server OK.');
});

export default router;