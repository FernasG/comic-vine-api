import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreteTableCharactersPowers1686238082973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'characters_powers',
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
                    name: 'character_id',
                    type: 'bigint',
                    unsigned: true
                },
                {
                    name: 'power_id',
                    type: 'bigint',
                    unsigned: true
                }
            ],
            foreignKeys: [
                new TableForeignKey({
                    columnNames: ['character_id'],
                    referencedTableName: 'characters',
                    referencedColumnNames: ['id']
                }),
                new TableForeignKey({
                    columnNames: ['power_id'],
                    referencedTableName: 'super_powers',
                    referencedColumnNames: ['id']
                })
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('characters_powers');
    }

}
