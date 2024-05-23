import { MysqlProductRepository } from "./mysqlProductRepository";

import { CreateProductController } from "./controllers/createProductController";
import { CreateProductUseCase } from "../appliaction/createProductUseCase";

import { GetAllProductUseCase } from "../appliaction/getAllProductUseCase";
import { GetAllProductController } from "./controllers/getAllProductController";

import { DeleteProductUseCase } from "../appliaction/deleteProductUseCase";
import { DeleteProductController } from "./controllers/deleteProductController";

export const mysqlProductRepository = new MysqlProductRepository();

export const createProductUseCase = new CreateProductUseCase(mysqlProductRepository);
export const createProductController = new CreateProductController(createProductUseCase);

export const getAllProductUseCase = new GetAllProductUseCase(mysqlProductRepository);
export const getAllProductController = new GetAllProductController(getAllProductUseCase);

export const deleteProductUseCase = new DeleteProductUseCase (mysqlProductRepository);
export const deleteProductController = new DeleteProductController (deleteProductUseCase);