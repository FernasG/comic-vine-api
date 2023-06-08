import { Router, Request, Response } from "express";
import { CharactersPowersLoader, EditorsCharactersLoader } from "./loaders";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await EditorsCharactersLoader();

    res.send('Server OK.');
});

export default router;