import { Check, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Movies {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamp' })
    release_date: Date;

    @Column({ type: 'timestamp' })
    date_added: Date;

    @Column({ type: 'varchar', length: 50 })
    runtime: string;

    @Column({ type: 'varchar', length: 30 })
    rating: string;

    @Column({ type: 'varchar', length: 255 })
    budget: string;

    @Column({ type: 'varchar', length: 255 })
    total_revenue: string;
}