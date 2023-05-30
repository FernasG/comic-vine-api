import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export default class SuperPower{

    @PrimaryColumn({type: 'bigint', unsigned: true})
    id: number;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true,
        nullable: false,
    })
    name:string;

    @Column({
        type: 'text',
        nullable: false
    })
    description:string;

    @Column({
        type: 'timestamp',
    })
    data_added: Date;
}