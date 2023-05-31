import { Router, Request, Response } from "express";
import { CharactersLoader } from "./loaders";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await CharactersLoader();

    res.send('Server OK.');
});

export default router;