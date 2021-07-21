import {Entity, PrimaryGeneratedColumn, Unique, Column, ManyToOne} from 'typeorm';
import {MinLength, IsNotEmpty, IsEmail} from 'class-validator';
import {Categorias} from './categorias';


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

  @Column()
  @IsNotEmpty()
  state: string;

  @ManyToOne(type => Categorias, categoria => categoria.productos)
  categoria: Categorias;


}
