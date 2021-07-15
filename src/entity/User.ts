import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MinLength, IsNotEmpty } from "class-validator";
@Entity()
@Unique(["nombre"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @MinLength(6)
  nombre: String;

  @Column()
  @MinLength(6)
  contraseña: String;

  @Column()
  @IsNotEmpty()
  rol: String;

  @Column()
  @CreateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;
}
