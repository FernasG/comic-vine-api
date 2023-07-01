import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Editors, Movies, SuperPowers } from "@database";

@Entity()
export class Characters {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: '255' })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    real_name: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    birth: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'integer', unsigned: true, default: 0 })
    count_of_issue_appearances: number;

    @ManyToMany(() => SuperPowers)
    @JoinTable({
        name: 'characters_powers',
        joinColumn: { name: 'character_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'power_id', referencedColumnName: 'id' }
    })
    powers: SuperPowers;

    @ManyToMany(() => Editors)
    @JoinTable({
        name: 'editors_characters',
        joinColumn: { name: 'character_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'editor_id', referencedColumnName: 'id' }
    })
    editors: Editors;

    @ManyToMany(() => Movies)
    @JoinTable({
        name: 'movies_characters',
        joinColumn: { name: 'character_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'id' }
    })
    movies: Movies;
}