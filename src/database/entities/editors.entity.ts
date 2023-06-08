import { Column, Entity, PrimaryColumn } from "typeorm";

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
}