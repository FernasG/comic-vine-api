import { DataSource } from "typeorm";
import { Response } from "../query.interface";

export const PowersCharactersOccurrences = (async (connection: DataSource): Promise<Response> => {
    try {
        const powers = await connection.createQueryRunner().query(`
            SELECT po.id, po.name, COUNT(po.name) AS power_appareances FROM characters AS ch
            INNER JOIN characters_powers AS chp ON chp.character_id = ch.id
            INNER JOIN super_powers AS po ON po.id = chp.power_id
            GROUP BY po.id, po.name
            ORDER BY power_appareances DESC
            LIMIT 100`
        );

        return { statusCode: 200, data: { powers } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});