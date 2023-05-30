import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Movie1684959426811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movie',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isUnique: true,
                    unsigned: true,
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '200'
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'release_date',
                    type: 'timestamp',
                },
                {
                    name: 'data_added',
                    type: 'timestamp',                },
                {
                    name: 'runtime',
                    type: 'varchar',
                    length: '15'
                },
                {
                    name: 'rating',
                    type: 'varchar',
                    length: '30',
                },
                {
                    name: 'budget',
                    type: 'real',
                    unsigned: true,
                },
                {
                    name: 'total_revenue',
                    type: 'real',
                    unsigned: true,
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movie');
    }

}
