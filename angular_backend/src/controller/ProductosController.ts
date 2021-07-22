import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Productos} from '../entity/Productos';
import {validate} from 'class-validator';
import {Categorias} from '../entity/categorias';


export class ProductosController {

  static getAll = async (req: Request, res: Response) => {
    const productosRepository = getRepository(Productos);
    let productos: Productos[];

    try {
      productos = await productosRepository.find({select: ['id', 'nombre', 'marca', 'descripcion', 'stock' , 'state']});
    } catch (e) {
      res.status(404).json({message: 'Somenthing goes wrong!'});
    }

    if (productos.length > 0) {
      res.send(productos);
    } else {
      res.status(404).json({message: 'Not result'});
    }
  }

  static getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const productosRepository = getRepository(Productos);
    try {
      const productos = await productosRepository.findOneOrFail(id);
      res.send(productos);
    } catch (e) {
      res.status(404).json({message: 'Not result'});
    }
  }

  static new = async (req: Request, res: Response) => {
    const {nombre, marca, descripcion, stock} = req.body;
    const productos = new Productos();

    productos.nombre = nombre;
    productos.marca = marca;
    productos.descripcion = descripcion;
    productos.stock = stock;
    productos.state = 'Habilitado';
    // Validate
    const validationOpt = {validationError: {target: false, value: false}};
    const errors = await validate(productos, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const productosRepository = getRepository(Productos);
    try {

      await productosRepository.save(productos);
    } catch (e) {
      return res.status(409).json({message: 'Producto ya existe'});
    }
    // All ok
    res.send('Producto creado ');
  }

  static edit = async (req: Request, res: Response) => {
    let productos;
    const {id} = req.params;
    const {nombre, marca, descripcion, stock} = req.body;

    const productosRepository = getRepository(Productos);
    // Try get user
    try {
      productos = await productosRepository.findOneOrFail(id);
      productos.nombre = nombre;
      productos.marca = marca;
      productos.descripcion = descripcion;
      productos.stock = stock;

    } catch (e) {
      return res.status(404).json({message: 'Producto no encontrado'});
    }
    const validationOpt = {validationError: {target: false, value: false}};
    const errors = await validate(productos, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await productosRepository.save(productos);
    } catch (e) {
      return res.status(409).json({message: 'Producto ya se encuentra disponible'});
    }

    res.status(201).json({message: 'Producto Modificado'});
  }

  static delete = async (req: Request, res: Response) => {
    const {id} = req.params;
    const productosRepository = getRepository(Productos);
    let productos: Productos;

    try {
      productos = await productosRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({message: 'Producto no encontrado'});
    }
    productos.state = 'Deshabilitado';
    await productosRepository.save(productos);
    // Remove user
    res.status(201).json({message: ' Producto eliminado'});
  }

  static assignCategory = async (req: Request, res: Response) => {
    let producto;
    const {id} = req.params;
    const {idDetalleProductos, nombre, descripcion} = req.body;
    const categoriaNueva = new Categorias();
    const productosRepository = getRepository(Productos);
    try {
      categoriaNueva.idDetalleProductos = idDetalleProductos;
      categoriaNueva.nombre = nombre;
      categoriaNueva.descripcion = descripcion;
      producto = await productosRepository.findOneOrFail(id);
      producto.categoria = categoriaNueva;
    } catch (e) {
      return res.status(404).json({message: 'Producto no encontrado'});
    }
    // Try to save producto
    try {
      await productosRepository.save(producto);
      res.status(201).json({message: 'Producto Modificado'});
    } catch (e) {
      return res.status(409).json({message: 'Producto ya se encuentra disponible'});
    }

  }

  static activateProducto = async (req: Request, res: Response) => {
    const {id} = req.params;
    const productosRepository = getRepository(Productos);
    let deshabilitado: Productos;

    try {
      deshabilitado = await productosRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({message: 'Producto no encontrado'});
    }
    deshabilitado.state = 'Habilitado';

    await productosRepository.save(deshabilitado);
    // Remove user
    res.status(201).json({message: ' Producto activado'});
  }

}

export default ProductosController;
