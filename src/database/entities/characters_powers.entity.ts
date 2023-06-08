import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CharactersPowers {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    power_id: number;

    @Column({ type: 'bigint', unsigned: true })
    character_id: number;
}