import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Characters, Volumes } from "@database";

@Entity()
export class Editors {
	@PrimaryColumn({ type: 'bigint', unsigned: true })
	id: number;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'timestamp', nullable: true })
	birth: Date;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ type: 'timestamp' })
	date_added: Date;

	@Column({ type: 'smallint' })
	gender: number;

	@Column({ type: 'varchar', length: 255, nullable: true })
	hometown: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	country: string;

	@ManyToMany(() => Volumes)
	@JoinTable({
		name: 'editors_volumes',
		joinColumn: { name: 'editor_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'volume_id', referencedColumnName: 'id' }
	})
	volumes: Volumes;

	@ManyToMany(() => Characters)
	@JoinTable({
		name: 'editors_characters',
		joinColumn: { name: 'editor_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'character_id', referencedColumnName: 'id' }
	})
	characters: Characters;
}