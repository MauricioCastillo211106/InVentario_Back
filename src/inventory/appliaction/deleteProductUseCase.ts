import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRespository";

export class DeleteProductUseCase {
    constructor (readonly productRepository : ProductRepository ){}

    async run(id:number):Promise<Product | null | string>{
        try {
            const deleteProduct = await this.productRepository.deleteProduct(id);
            return deleteProduct
        } catch (error) {
            return null;
        }
    }
}