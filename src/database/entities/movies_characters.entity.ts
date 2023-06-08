import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class MoviesCharacters {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    movie_id: number;

    @Column({ type: 'bigint', unsigned: true })
    character_id: number;
}