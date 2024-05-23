import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRespository";


export class GetAllProductUseCase{
    constructor (readonly productReposotory:ProductRepository){}

    async run():Promise<Product[] | null>{
        try {
            const getAll = await this.productReposotory.getAllProduct();
            return getAll;
        } catch (error) {
            return null;
        }
    }
}