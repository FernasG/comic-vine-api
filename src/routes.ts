import { Router, Request, Response } from "express";
import { CharactersLoader } from "./loaders";
import { MoviesLoader } from "./loaders/movies/movies.loader";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    await MoviesLoader();

    res.send('Server OK.');
});

export default router;