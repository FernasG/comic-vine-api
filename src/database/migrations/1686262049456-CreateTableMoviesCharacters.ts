import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableMoviesCharacters1686262049456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movies_characters',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isUnique: true,
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'movie_id',
                    type: 'bigint',
                    unsigned: true
                },
                {
                    name: 'character_id',
                    type: 'bigint',
                    unsigned: true
                }
            ],
            foreignKeys: [
                new TableForeignKey({
                    columnNames: ['movie_id'],
                    referencedTableName: 'movies',
                    referencedColumnNames: ['id']
                }),
                new TableForeignKey({
                    columnNames: ['character_id'],
                    referencedTableName: 'characters',
                    referencedColumnNames: ['id']
                })
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies_characters');
    }

}
