import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRespository";

export class UpdateProductUseCase{
    constructor(readonly ingredienteReposity: ProductRepository){}

    async run(id:number, nombre?:string, precio?:number,stock?:number):Promise<Product| null>{
        try {

            return await this.ingredienteReposity.updateProduct(id,nombre,precio,stock);

        } catch (error) {
            return null;
        }

    }
}