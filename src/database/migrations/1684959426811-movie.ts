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
                    isNullable: true,
                },
                {
                    name: 'release_date',
                    type: 'timestamp',
                },
                {
                    name: 'date_added',
                    type: 'timestamp',                
                },
                {
                    name: 'runtime',
                    type: 'varchar',
                    length: '15',
                    isNullable: true,
                },
                {
                    name: 'rating',
                    type: 'varchar',
                    length: '30',
                    isNullable: true,
                },
                {
                    name: 'budget',
                    type: 'varchar',
                    length: '200',
                    unsigned: true,
                    isNullable: true,
                },
                {
                    name: 'total_revenue',
                    type: 'varchar',
                    length: '200',
                    unsigned: true,
                    isNullable: true,
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movie');
    }

}
