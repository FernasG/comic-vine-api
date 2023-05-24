import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Characters } from "./characters.entity";
import SuperPoder from "./super-power.entity";


@Entity()
export class Heroi {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Characters)
  @JoinColumn({ name: "fk_Personagem_id_personagem" })
  personagem: Characters;

  @ManyToOne(() => SuperPoder)
  @JoinColumn({ name: "fk_SuperPoder_id_poder" })
  superPoder: SuperPoder;
}