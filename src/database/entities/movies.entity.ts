import { Check, Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export default class Movies {

    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id_filme: number;

    @Column({
        type: 'varchar',
        length: 200,
        unique: true,
        nullable: false,
    })
    nome: string;

    @Column({
        type: 'text',
        nullable: false
    })
    descricao: string;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    data_lancamento: Date;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    data_comic: Date;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: false
    })
    tempo: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false
    })
    classificacao: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0

    })
    @Check("orcamento > 0")
    orcamento: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0

    })
    @Check("receita_bilheteria > 0")
    receita_bilheteria: number;

}