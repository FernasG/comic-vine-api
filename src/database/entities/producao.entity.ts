import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import Movie from "./movie.entity";
import { Characters } from "./characters.entity";


@Entity()
export class Producao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Characters)
  @JoinColumn({ name: "fk_Personagem_id_personagem" })
  personagem: Characters;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: "fk_Filme_id_filme" })
  filme: Movie;
}