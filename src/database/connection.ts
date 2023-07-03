import { DataSource, DataSourceOptions } from "typeorm";

export const Connection = ((): Promise<DataSource | null> => {
    const databaseConfig: DataSourceOptions = {
        type: 'postgres',
        url: 'postgres://postgres:admin@localhost:5432/api',
        entities: ['src/**/entities/*.entity.{js,ts}']
    };

    const connection = new DataSource(databaseConfig).initialize().catch(err => {
        console.error(err.message);
        return null;
    });

    return connection;
});