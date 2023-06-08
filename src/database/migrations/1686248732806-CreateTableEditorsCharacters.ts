import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableEditorsCharacters1686248732806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'editors_characters',
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
                    name: 'editor_id',
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
                    columnNames: ['editor_id'],
                    referencedTableName: 'editors',
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
        await queryRunner.dropTable('editors_characters');
    }

}
