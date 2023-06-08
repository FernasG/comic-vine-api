import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableVolume1685475128908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'volumes',
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
                    name: 'start_year',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'count_of_issues',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'date_added',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('volumes');
    }

}
