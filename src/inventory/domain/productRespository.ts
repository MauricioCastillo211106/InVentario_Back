import { Product } from "./product";


export interface ProductRepository{

    createProduct(nombre:string, precio:number,stock:number):Promise<Product | null>;

    getAllProduct():Promise<Product[] | null>

    deleteProduct(id:number):Promise<Product | null| string>;

}