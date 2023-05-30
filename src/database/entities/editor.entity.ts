import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Editor')
export default class Editor{
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true
  })
  id_editor: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name:string;

  @Column({
    type: 'text',
  })
  description:string;

  @Column({
    type: 'timestamp',
  })
  comic_date:Date;

  @Column({
    type: 'varchar',
    length: 255,
  })
  state:string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  city:string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  street:string;

}