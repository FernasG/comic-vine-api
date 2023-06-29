import { Characters, Connection, Editors, Movies } from "@database";
import { Router, Request, Response } from "express";

const router = Router();

const tableMap: { [x: string]: any } = {
    characters: Characters,
    editors: Editors,
    movies: Movies
};

router.get('', async (req: Request, res: Response) => {
    res.send('Server OK.');
});

router.post('/filter', async (req: Request, res: Response) => {
    try {
        const { table, select, joins } = req.body;

        if (!Object.keys(tableMap).includes(table)) return res.status(400).json({ message: 'Table selected not found' });

        const entity = tableMap[table];

        const connection = await Connection();

        if (!connection) return res.status(500).json({ message: 'Failed to create database connection' });

        const query = connection.getRepository(entity).createQueryBuilder('u').select(select);

        if (joins && Array.isArray(joins)) {
            for (const join of joins) {
                query.innerJoin('u.powers', 'pw')
            }
        }

        const items = await query.limit(100).getMany();

        return res.status(200).json({ table, [table]: items });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;