import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Movie1684959426811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movies',
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
                    length: '255'
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'release_date',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'date_added',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'runtime',
                    type: 'varchar',
                    length: '50',
                    isNullable: true
                },
                {
                    name: 'rating',
                    type: 'varchar',
                    length: '30',
                    isNullable: true
                },
                {
                    name: 'budget',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'total_revenue',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies');
    }

}
