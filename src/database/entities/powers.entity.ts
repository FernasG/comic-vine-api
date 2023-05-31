import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export default class Powers{

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
        nullable: true
    })
    description:string;

    @Column({
        type: 'timestamp',
    })
    date_added: Date;
}