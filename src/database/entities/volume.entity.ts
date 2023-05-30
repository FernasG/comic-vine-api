import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Volume')
export default class Volume{
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true
  })
  id_volume: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name:string;

  @Column({
    type: 'integer',
    unsigned: true,
    default: 0
  })
  editions_number:number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  nickname:string;

  @Column({ 
    type: 'timestamp', 
  })
  comic_date:Date;

  @Column({
    type: 'text',
  })
  description:string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  last_edition:string;
  
  @Column({
    type: 'varchar',
    length: 255,
  })
  first_edition:string;

}