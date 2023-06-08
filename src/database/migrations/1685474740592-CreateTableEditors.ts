import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableEditor1685474740592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'editors',
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
                    name: 'birth',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'date_added',
                    type: 'timestamp'
                },
                {
                    name: 'gender',
                    type: 'smallint'
                },
                {
                    name: 'hometown',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'country',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('editors');
    }

}
