import { DataSource, DataSourceOptions } from "typeorm";

export const Connection = ((): Promise<DataSource | null> => {
    const databaseConfig: DataSourceOptions = {
        type: 'postgres',
        url: process.env.DATABASE_CONNECTION_URL,
        entities: ['dist/**/entities/*.entity.{js,ts}']
    };

    const connection = new DataSource(databaseConfig).initialize().catch(err => {
        console.error(err.message);
        return null;
    });

    return connection;
});