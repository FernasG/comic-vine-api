import { Connection } from "@database";
import { TableMap } from "./query.constants";

const parseQueryParams = ((params: any): { table: string, joins: string[], select: string[], take: number, skip: number } => {
    const { table, select, joins, limit, offset } = params;

    const take = limit && parseInt(limit) <= 100 ? parseInt(limit) : 100;
    const skip = offset && parseInt(offset) ? parseInt(offset) : 0;

    const queryParams = {
        table: table ? table : null,
        joins: joins ? joins.split(',') : [],
        select: select ? select.split(',') : [],
        take,
        skip
    };

    return queryParams;
});

export const query = (async (queryParams: any): Promise<{ statusCode: number, data: object }> => {
    try {
        const { table, select, joins, take, skip } = parseQueryParams(queryParams);

        if (!Object.keys(TableMap).includes(table)) return { statusCode: 400, data: { message: 'Table selected not found' } };

        const { entity, relations } = TableMap[table];

        const connection = await Connection();

        if (!connection) return { statusCode: 500, data: { message: 'Failed to create database connection' } };

        const query = connection.getRepository(entity).createQueryBuilder(table).select(select);

        if (joins && Array.isArray(joins)) {
            for (const joinTable of joins) {
                if (!relations.includes(joinTable)) continue;

                query.innerJoin(`${table}.${joinTable}`, joinTable);
            }
        }

        const items = await query.orderBy(`${table}.id`).take(take).skip(skip).getMany();
        const count = await query.getCount();

        return { statusCode: 200, data: { count, [table]: items, next_page: 'http://localhost:3000/query' } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});