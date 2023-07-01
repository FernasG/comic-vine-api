import { DataSource } from "typeorm";
import { Response } from "../query.interface";

export const CharactersMoviesAppearances = (async (connection: DataSource): Promise<Response> => {
    try {
        const characters = await connection.createQueryRunner().query(`
            SELECT ch.id, ch.name, COUNT(ch.name) AS movies_appearances FROM characters AS ch
            INNER JOIN movies_characters AS mch ON mch.character_id = ch.id
            INNER JOIN movies AS mo ON mo.id = mch.movie_id
            GROUP BY ch.id, ch.name
            ORDER BY movies_appearances DESC LIMIT 10;`
        );

        return { statusCode: 200, data: { characters } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});