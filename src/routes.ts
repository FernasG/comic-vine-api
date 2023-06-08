import { Router, Request, Response } from "express";
import { CharactersPowersLoader, CharactersLoader } from "./loaders";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await CharactersPowersLoader();

    res.send('Server OK.');
});

export default router;