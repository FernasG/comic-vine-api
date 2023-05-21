import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_CONNECTION_URL,
    migrations: ['dist/**/migrations/**.{js,ts}']
});