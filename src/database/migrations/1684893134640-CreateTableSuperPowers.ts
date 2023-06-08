import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class SuperPoder1684893134640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'super_powers',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isUnique: true,
                    unsigned: true,
                    isPrimary: true
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    length: '30',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'descricao',
                    type: 'text'
                },
                {
                    name: 'data_comic',
                    type: 'timestamp'
                }
            ]
        }));


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('super_powers');
    }

}
