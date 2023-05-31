import { Check, Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export default class Movie{

    @PrimaryColumn({type: 'bigint', unsigned: true})
    id: number;

    @Column({
        type: 'varchar',
        length: 200,
        unique: true,
        //nullable: false,
    })
    name:string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description:string;

    @Column({
        type: 'timestamp',
        //nullable: false
    })
    release_date: Date;

    @Column({
        type: 'timestamp',
        //nullable: false
    })
    date_added: Date;

    @Column({
        type: 'varchar',
        length: 15,
        //nullable: false
        nullable: true,
    })
    runtime: string;

    @Column({
        type: 'varchar',
        length: 30,
        //nullable: false
        nullable: true,
    })
    rating: string;

    @Column({
        type: 'varchar',
        length: 200,
        //precision: 10,
        //scale: 2,
        //nullable: false,
        //default: 0
        nullable: true,

    })
    budget: string;

    @Column({
        type: 'varchar',
        length: 200,
        //precision: 10,
        //scale: 2,
        //nullable: false,
        //default: 0
        nullable: true,

    })
    total_revenue: string;

}