import { Router, Request, Response } from "express";
import { CharactersLoader, EditorLoader, VolumeLoader } from "./loaders";
// import { MoviesLoader } from "./loaders/movies/movies.loader";

const router = Router();

router.get('', async (req: Request, res: Response) => {
    // await MoviesLoader();
    await EditorLoader();
    await VolumeLoader();

    res.send('Server OK.');
});

export default router;