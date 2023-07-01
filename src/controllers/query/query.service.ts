import { Connection } from "@database";
import { TableMap } from "./query.constants";
import { QueryParamsParsed, Response } from "./query.interface";
import { FiltersService } from "./filters/filters.service";

const parseQueryParams = ((params: any): QueryParamsParsed => {
    const { table, select, joins, limit, offset, filter } = params;

    const take = limit && parseInt(limit) <= 100 ? parseInt(limit) : 100;
    const skip = offset && parseInt(offset) ? parseInt(offset) : 0;

    const queryParams: QueryParamsParsed = {
        table: table ? table : null,
        joins: joins ? joins.split(',') : [],
        select: select ? select.split(',') : [],
        take,
        skip
    };

    if (filter && parseInt(filter)) queryParams.filterId = parseInt(filter);

    return queryParams;
});

export const query = (async (queryParams: any): Promise<Response> => {
    try {
        const { table, select, joins, take, skip, filterId } = parseQueryParams(queryParams);

        if (!Object.keys(TableMap).includes(table)) return { statusCode: 400, data: { message: 'Table selected not found' } };

        const { entity, relations } = TableMap[table];

        const connection = await Connection();

        if (!connection) return { statusCode: 500, data: { message: 'Failed to create database connection' } };

        if (filterId) {
            const FilterFunction = FiltersService.getFilterFunction(filterId);

            if (FilterFunction) return FilterFunction(connection);
        }

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