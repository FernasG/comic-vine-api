import { DataSource } from "typeorm";
import { Response } from "../query.interface";
import { Editors } from "@database";

export const EditorsVolumesWritten = (async (connection: DataSource): Promise<Response> => {
    try {
        const editors = await connection.createQueryRunner().query(`
            SELECT ed.id, ed.name, COUNT(ed.id) AS volumes_written FROM editors AS ed
            INNER JOIN editors_volumes AS edv ON edv.editor_id = ed.id
            INNER JOIN volumes AS vl ON vl.id = edv.volume_id
            GROUP BY ed.id, ed.name
            ORDER BY volumes_written DESC
            LIMIT 10`
        );

        return { statusCode: 200, data: { editors } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});

export const EditorsCharactersVolumes = (async (connection: DataSource): Promise<Response> => {
    try {
        const editors = await connection.getRepository(Editors).find({
            take: 100, select: ['id', 'name', 'characters', 'volumes'], relations: { characters: true, volumes: true }
        });

        return { statusCode: 200, data: { editors } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});

export const EditorsCountry = (async (connection: DataSource) => {
    try {
        const editors = await connection.createQueryRunner().query(`
            SELECT country, COUNT(country) AS editors_nationality FROM editors
            WHERE country IS NOT NULL
            GROUP BY country
            ORDER BY editors_nationality DESC;`
        );

        return { statusCode: 200, data: { editors } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
})