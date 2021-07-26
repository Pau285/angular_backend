import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, Timestamp,
} from 'typeorm';
import {MinLength, MaxLength} from 'class-validator';
import {Productos} from '../entity/Productos';

@Entity()
@Unique(['nombre'])
export class Categorias {
  @PrimaryGeneratedColumn()
  idDetalleProductos: number;
  @Column()
  @MinLength(6)
  @MaxLength(45)
  nombre: string;

  @Column()
  @MinLength(6)
  @MaxLength(255)
  descripcion: string;

  @Column()
  @CreateDateColumn()
  createAt: Timestamp;

  @Column()
  @UpdateDateColumn()
  updateAt: Timestamp;

  @Column()
  @MaxLength(13)
  state: string;

  @OneToMany(type => Productos, productos => productos.categoria)
  productos: Productos[];


}
