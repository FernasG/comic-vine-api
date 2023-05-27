import { Check, Column, Entity, PrimaryColumn } from "typeorm";


@Entity('Movie')
export default class Movie{

    @PrimaryColumn({type: 'bigint', unsigned: true})
    id: number;

    @Column({
        type: 'varchar',
        length: 200,
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
        nullable: false
    })
    release_date: Date;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    date_added: Date;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: false
    })
    runtime: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false
    })
    rating: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0

    })
    @Check("budget > 0")
    budget: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0

    })
    @Check("total_revenue > 0")
    total_revenue: number;

}