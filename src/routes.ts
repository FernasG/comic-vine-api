import { Router, Request, Response } from "express";
import { QueryController } from "./controllers";

const router = Router();

router.get('', async (req: Request, res: Response) => res.send('Server OK.'));
router.get('/query', async (req: Request, res: Response) => QueryController.query(req, res));

export default router;