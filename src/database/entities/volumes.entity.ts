import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Volumes {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'integer',
    unsigned: true,
    default: 0
  })
  editions_number: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  nickname: string;

  @Column({
    type: 'timestamp',
  })
  comic_date: Date;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  last_edition: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  first_edition: string;

}