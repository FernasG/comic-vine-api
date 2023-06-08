import { timeStamp } from 'console'
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
                    name: 'description',
                    type: 'text'
                },
                {
                    name: 'comic_date',
                    type: 'timestamp'
                },
                {
                    name: 'state',
                    type: 'varchar(255)'
                },
                {
                    name: 'city',
                    type: 'varchar(255)'
                },
                {
                    name: 'street',
                    type: 'varchar(255)'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('editors');
    }

}
