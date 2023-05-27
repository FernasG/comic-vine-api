import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Characters } from "./characters.entity";
import SuperPower from "./super-power.entity";


@Entity()
export class Heroi {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Characters)
  @JoinColumn({ name: "fk_Personagem_id_personagem" })
  personagem: Characters;

  @ManyToOne(() => SuperPower)
  @JoinColumn({ name: "fk_SuperPoder_id_poder" })
  superPoder: SuperPower;
}