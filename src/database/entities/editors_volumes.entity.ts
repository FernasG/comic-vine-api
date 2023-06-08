import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class EditorsVolumes {
    @PrimaryColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    editor_id: number;

    @Column({ type: 'bigint', unsigned: true })
    volume_id: number;
}