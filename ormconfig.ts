import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_CONNECTION_URL,
    migrations: ['src/**/migrations/**.{js,ts}']
});