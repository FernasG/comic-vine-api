import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export default class SuperPoder{

    @PrimaryColumn({type: 'integer', unsigned: true})
    id_poder: number;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true,
        nullable: false,
    })
    nome:string;

    @Column({
        type: 'text',
        nullable: false
    })
    descricao:string;

    @Column({
        type: 'timestamp',
    })
    data_comic: Date;
}