import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class SuperPoder1684893134640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'powers',
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
                    length: '30',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'date_added',
                    type: 'timestamp',
                }
            ]
        }));

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('powers');
    }

}
