import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableVolume1685475128908 implements MigrationInterface {

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
                    name: 'editions_number',
                    type: 'integer',
                    default: 0
                },
                {
                    name: 'nickname',
                    type: 'varchar(255)'
                },
                {
                    name: 'comic_date',
                    type: 'timestamp'
                },
                {
                    name: 'description',
                    type: 'text'
                },
                {
                    name: 'last_edition',
                    type: 'varchar(255)'
                },
                {
                    name: 'first_edition',
                    type: 'varchar(255)'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
