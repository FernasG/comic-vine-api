import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Characters } from "@database";

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

    @ManyToMany(() => Characters)
    @JoinTable({
        name: 'movies_characters',
        joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'character_id', referencedColumnName: 'id' }
    })
    characters: Characters;
}