import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRespository";
import { query } from "../../database/mysql";

export class MysqlProductRepository implements ProductRepository{

    async createProduct(nombre: string, precio: number, stock: number): Promise<Product | null> {
        try {
            const sql = "INSERT INTO inventary (nombre, precio, stock) VALUES (?, ?, ?)";
            const params: any[] = [nombre, precio, stock];
            const result: any = await query(sql, params);
            return new Product(nombre, precio, stock);
        } catch (error) {
            console.error("Error creating product:", error);
            return null;
        }
    }

    async getAllProduct(): Promise<Product[] | null> {
        try {
            const sql = "SELECT * FROM inventary";
            const [result]: any = await query(sql, []);
            if (result.length > 0) {
                const products: Product[] = result.map((row: any) => new Product(row.nombre, row.precio, row.stock));
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            return null;
        }
    }
    async deleteProduct(id: number): Promise<Product | null | string> {
        try {
            const sql = "DELETE FROM inventary WHERE id = ?";
            const [result]: any = await query(sql, [id]);
            
            if (result && result.affectedRows !== undefined) {
                if (result.affectedRows === 0) {
                    return "No se pudo eliminar el producto.";
                } else {
                    return "Producto eliminado exitosamente.";
                }
            } else {
                return "No se pudo eliminar el producto.";
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            return "No se pudo eliminar el producto.";
        }
    }

    
}