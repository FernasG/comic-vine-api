import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Editors {
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
    type: 'text',
  })
  description: string;

  @Column({
    type: 'timestamp',
  })
  comic_date: Date;

  @Column({
    type: 'varchar',
    length: 255,
  })
  state: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  street: string;
}