import { Router, Request, Response } from "express";
import { CharactersPowersLoader } from "./loaders";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await CharactersPowersLoader();

    res.send('Server OK.');
});

export default router;