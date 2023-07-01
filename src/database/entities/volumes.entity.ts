import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Editors } from "@database";

@Entity()
export class Volumes {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 4 })
    start_year: string;

    @Column({ type: 'integer', unsigned: true, default: 0 })
    count_of_issues: number;

    @Column({ type: 'timestamp', nullable: true })
    date_added: Date;

    @ManyToMany(() => Editors)
    @JoinTable({
        name: 'editors_volumes',
        joinColumn: { name: 'volume_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'editor_id', referencedColumnName: 'id' }
    })
    editors: Editors;
}