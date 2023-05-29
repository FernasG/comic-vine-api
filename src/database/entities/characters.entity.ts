import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Characters {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: '255' })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    real_name: string;

    @Column({ type: 'timestamp', nullable: true })
    birth: Date;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'integer', unsigned: true, default: 0 })
    count_of_issue_appearances: number;
}