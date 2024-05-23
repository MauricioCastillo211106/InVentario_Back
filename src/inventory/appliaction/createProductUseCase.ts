import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRespository";

export class CreateProductUseCase{
    constructor( readonly ProductReposiotry:ProductRepository){}

    async run(nombre:string, precio:number, stock:number):Promise<Product | null>{
        try {
            const createProduct = await this.ProductReposiotry.createProduct(nombre,precio,stock);
            return createProduct;
        } catch (error) {
            return null;
        }
    }
}