import { Router, Request, Response } from "express";
import { MoviesLoader, MoviesCharactersLoader } from "./loaders";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await MoviesCharactersLoader();

    res.send('Server OK.');
});

export default router;