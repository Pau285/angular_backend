import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import {Productos} from '../entity/Productos';
import { validate } from 'class-validator';

export class ProductosController {
  static getAll = async (req: Request, res: Response) => {
    const productosRepository = getRepository(Productos);
    let productos;

    try {
      productos = await productosRepository.find({ select: ['id', 'nombre', 'marca', 'descripcion', 'stock'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (productos.length > 0) {
      res.send(productos);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productosRepository = getRepository(Productos);
    try {
      const productos = await productosRepository.findOneOrFail(id);
      res.send(productos);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { nombre, marca, descripcion, stock } = req.body;
    const productos = new Productos();

    productos.nombre = nombre;
    productos.marca = marca;
    productos.descripcion = descripcion;
    productos.stock=stock;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(productos, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const productosRepository = getRepository(Productos);
    try {
      
      await productosRepository.save(productos);
    } catch (e) {
      return res.status(409).json({ message: 'Producto ya existe' });
    }
    // All ok
    res.send('Producto creado ');
  };

  static edit = async (req: Request, res: Response) => {
    let productos;
    const { id } = req.params;
    const { nombre, marca, descripcion, stock } = req.body;

    const productosRepository = getRepository(Productos);
    // Try get user
    try {
      productos = await productosRepository.findOneOrFail(id);
      productos.nombre= nombre;
      productos.marca=marca;
      productos.descripcion=descripcion;
      productos.stock=stock;
    } catch (e) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(productos, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await productosRepository.save(productos);
    } catch (e) {
      return res.status(409).json({ message: 'Producto ya se encuentra disponible' });
    }

    res.status(201).json({ message: 'Producto Modificado' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productosRepository = getRepository(Productos);
    let productos: Productos;

    try {
      productos = await productosRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Remove user
    productosRepository.delete(id);
    res.status(201).json({ message: ' Producto eliminado' });
  };
}

export default ProductosController;
