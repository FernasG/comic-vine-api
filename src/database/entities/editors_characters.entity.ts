import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class EditorsCharacters {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    character_id: number;

    @Column({ type: 'bigint', unsigned: true })
    editor_id: number;
}