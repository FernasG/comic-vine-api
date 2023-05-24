import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCharactersTable1684631587874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'characters',
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
                    name: 'real_name',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'origin',
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
                },
                {
                    name: 'count_of_issue_appearances',
                    type: 'integer',
                    default: 0,
                    unsigned: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('characters');
    }

}
