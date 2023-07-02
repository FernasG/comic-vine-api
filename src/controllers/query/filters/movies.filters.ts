import { DataSource } from "typeorm";

export const MoviesHigherDuration = (async (connection: DataSource) => {
    try {
        const movies = await connection.createQueryRunner().query(`
            SELECT id, name, runtime FROM movies WHERE runtime IS NOT NULL
            ORDER BY CAST(runtime AS INTEGER) DESC LIMIT 10;
        `);

        return { statusCode: 200, data: { movies } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});


export const MoviesLowerDuration = (async (connection: DataSource) => {
    try {
        const movies = await connection.createQueryRunner().query(`
            SELECT id, name, runtime FROM movies WHERE runtime IS NOT NULL
            ORDER BY CAST(runtime AS INTEGER) ASC LIMIT 10;
        `);

        return { statusCode: 200, data: { movies } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});

export const MoviesHigherRevenue = (async (connection: DataSource) => {
    try {
        const movies = await connection.createQueryRunner().query(`
            SELECT id, name, total_revenue FROM movies WHERE total_revenue IS NOT NULL
            ORDER BY CAST(total_revenue AS BIGINT) DESC LIMIT 10;
        `);

        return { statusCode: 200, data: { movies } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});


export const MoviesLowerRevenue = (async (connection: DataSource) => {
    try {
        const movies = await connection.createQueryRunner().query(`
            SELECT id, name, total_revenue FROM movies WHERE total_revenue IS NOT NULL
            ORDER BY CAST(total_revenue AS BIGINT) ASC LIMIT 10;
        `);

        return { statusCode: 200, data: { movies } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});

export const MoviesHigherBudget = (async (connection: DataSource) => {
    try {
        const movies = await connection.createQueryRunner().query(`
            SELECT id, name, budget FROM movies WHERE budget IS NOT NULL
            ORDER BY CAST(budget AS BIGINT) DESC LIMIT 10;
        `);

        return { statusCode: 200, data: { movies } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});


export const MoviesLowerBudget = (async (connection: DataSource) => {
    try {
        const movies = await connection.createQueryRunner().query(`
            SELECT id, name, budget FROM movies WHERE budget IS NOT NULL
            ORDER BY CAST(budget AS BIGINT) ASC LIMIT 10;
        `);

        return { statusCode: 200, data: { movies } };
    } catch (err: any) {
        return { statusCode: 500, data: { message: err.message } };
    }
});