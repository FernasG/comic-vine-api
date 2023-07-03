import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    url: 'postgres://postgres:admin@localhost:5432/api',
    migrations: ['src/**/migrations/**.{js,ts}']
});