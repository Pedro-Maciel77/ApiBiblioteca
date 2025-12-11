import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column()
  isbn: string;

  @Column()
  anoPublicacao: number;

  @Column({ default: true })
  disponivel: boolean;
}
