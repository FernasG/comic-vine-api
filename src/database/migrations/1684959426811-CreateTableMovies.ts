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
                    name: 'nome',
                    type: 'varchar',
                    length: '200'
                },
                {
                    name: 'descricao',
                    type: 'text',
                },
                {
                    name: 'data_lancamento',
                    type: 'timestamp',
                },
                {
                    name: 'data_comic',
                    type: 'timestamp',
                },
                {
                    name: 'tempo',
                    type: 'varchar',
                    length: '15'
                },
                {
                    name: 'classificacao',
                    type: 'varchar',
                    length: '30'
                },
                {
                    name: 'orcamento',
                    type: 'real'
                },
                {
                    name: 'receita_bilheteria',
                    type: 'real'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies');
    }

}
