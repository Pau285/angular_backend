import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Categorias} from '../entity/categorias';
import {Productos} from '../entity/Productos';
import {validate} from 'class-validator';

export class categoriasController {
  // Obtener todas las categorias habilitadas con createQueryBuilder
  static getAllActivated = async (req: Request, res: Response) => {
    try {
      const categorias = await getRepository(Categorias)
        .createQueryBuilder('categorias')
        .select('idDetalleProductos')
        .addSelect('nombre')
        .addSelect('descripcion')
        .addSelect('createAt')
        .addSelect('updateAt')
        .addSelect('state')
        .where("state = 'Habilitado'")
        .getRawMany();
      if(!!categorias){
        res.status(200).send(categorias);
      }else{
        res.status(404).send('Not found');
      }
    }catch(error){
      res.status(500).json({error});
    }

  }

  static getAllProducts = async (req: Request, res: Response) =>{
    const {id} = req.params;
    try{
      const categoryRepo = await getRepository(Categorias)
        .createQueryBuilder('categorias')
        .innerJoinAndSelect(Productos, 'p','p.categoriaIdDetalleProductos = categorias.idDetalleProductos')
        .where("categorias.idDetalleProductos = :idDetalleProductos", {idDetalleProductos: id})
        .select(['p.id', 'p.nombre', 'p.marca', 'p.descripcion', 'p.stock', 'p.state','categorias.nombre'])
        .getRawMany();
      if(!!categoryRepo){
        res.status(200).send(categoryRepo);
      }else{
        res.status(404).send('Not Found');
      }
    }catch(error){
      res.status(500).send(`GetAllProducts: ${error}`);
    }
  }

  // Obtener todas las categorias deshabilitadas
  static getAllDeactivated = async (req: Request, res: Response) => {
    try {
      const categorias = await getRepository(Categorias)
        .createQueryBuilder('categorias')
        .select('idDetalleProductos')
        .addSelect('nombre')
        .addSelect('descripcion')
        .addSelect('createAt')
        .addSelect('updateAt')
        .addSelect('state')
        .where("state = 'Deshabilitado'")
        .getRawMany();
      if(!!categorias){
        res.status(200).send(categorias);
      }else{
        res.status(404).send('Not found');
      }
    }catch(error){
      res.status(500).json({error});
    }
  }
  // Crear categoria
  static save = async (req: Request, res: Response) => {
    const {nombre, descripcion} = req.body;
    const categoriasRepository = getRepository(Categorias);
    const categoria: Categorias = new Categorias();
    try {
      categoria.nombre = nombre;
      categoria.descripcion = descripcion;
      const errors = await validate(categoria);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
      await categoriasRepository.save(categoria);
      res.status(200).json('Categoria save OK');
    } catch (error) {
      res.status(500).json({message: error});
    }
  }
  // Modificar categoria
  static update = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre, descripcion} = req.body;
    const categoriasRepository = getRepository(Categorias);
    let categorias: Categorias;

    try {
      categorias = await categoriasRepository.findOneOrFail(id);
      categorias.nombre = nombre;
      categorias.descripcion = descripcion;
      await categoriasRepository.save(categorias);
      res.status(201).json({message: 'Categoria update OK'});
    } catch (error) {
      res.status(500).json({message: error});
    }
  }
  static assignProductos = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {productos} = req.body;
    const categoriasRepository = getRepository(Categorias);
    let categorias;
    try {
      categorias = await categoriasRepository.findOneOrFail(id);
      categorias.productos = productos;
      await categoriasRepository.save(categorias);
      res.status(201).json({message: 'Categoria update OK'});
    } catch (error) {
      res.status(500).json({message: error});
    }
  }
  // Obtener categoria por id
  static getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const categoriasRepository = getRepository(Categorias);
    let categorias: Categorias;
    try {
      categorias = await categoriasRepository.findOneOrFail(id);
      res.status(201).json({categorias});
    } catch (error) {
      res.status(404).json({message: 'Categoria not found'});
    }
  }
  // Eliminar categoria de forma logica
  static logicalDelete = async (req: Request, res: Response) => {
    const {id} = req.params;
    const categoriasRepository = getRepository(Categorias);
    let categorias: Categorias;

    try {
      categorias = await categoriasRepository.findOneOrFail(id);
      categorias.state = 'Deshabilitado';
      await categoriasRepository.save(categorias);
      res.status(201).json({message: 'Categoria logical delete OK'});
    } catch (error) {
      res.status(500).json({message: error});
    }
  }

}

export default categoriasController;
