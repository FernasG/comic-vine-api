import { Router, Request, Response } from "express";
import { Connection } from "@database";

const router = Router();

router.get('', (req: Request, res: Response) => {
    const connection = Connection();
    
    res.send('Server OK.');
});

export default router;