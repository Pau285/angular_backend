import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';


@Entity()
@Unique(['nombre'])
export class Productos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  
  
  @IsNotEmpty()
  nombre: string;

  @Column()
  
  @IsNotEmpty()
  marca: string;

  @Column()
  @IsNotEmpty()
  descripcion: string;

  @Column()
  @IsNotEmpty()
  stock: number;

 

}