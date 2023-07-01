import { Volumes } from "@database";
import { DataSource } from "typeorm";
import { Response } from "../query.interface";

export const VolumesIssues = (async (connection: DataSource): Promise<Response> => {
    try {
        const volumes = await connection.getRepository(Volumes).find({ take: 100, order: { count_of_issues: 'DESC' } });

        return { statusCode: 200, data: { volumes } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});