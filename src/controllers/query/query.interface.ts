export interface QueryParamsParsed {
    table: string;
    joins: string[];
    select: string[];
    take: number;
    skip: number;
    filterId?: number;
}

export interface Response {
    statusCode: number;
    data: object;
}