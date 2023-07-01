import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Characters } from "@database";

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

    @ManyToMany(() => Characters)
    @JoinTable({
        name: 'characters_powers',
        joinColumn: { name: 'power_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'character_id', referencedColumnName: 'id' }
    })
    characters: Characters;
}