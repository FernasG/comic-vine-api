import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SuperPowers {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamp' })
    date_added: Date;
}