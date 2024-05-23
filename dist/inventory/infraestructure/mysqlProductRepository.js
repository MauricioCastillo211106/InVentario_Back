"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlProductRepository = void 0;
const product_1 = require("../domain/product");
const mysql_1 = require("../../database/mysql");
class MysqlProductRepository {
    createProduct(nombre, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO inventary (nombre, precio, stock) VALUES (?, ?, ?)";
                const params = [nombre, precio, stock];
                const result = yield (0, mysql_1.query)(sql, params);
                const id = result.id;
                return new product_1.Product(id, nombre, precio, stock);
            }
            catch (error) {
                console.error("Error creating product:", error);
                return null;
            }
        });
    }
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM inventary";
                const [result] = yield (0, mysql_1.query)(sql, []);
                if (result.length > 0) {
                    const products = result.map((row) => new product_1.Product(row.id, row.nombre, row.precio, row.stock));
                    return products;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.error("Error fetching products:", error);
                return null;
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM inventary WHERE id = ?";
                const [result] = yield (0, mysql_1.query)(sql, [id]);
                if (result && result.affectedRows !== undefined) {
                    if (result.affectedRows === 0) {
                        return "No se pudo eliminar el producto.";
                    }
                    else {
                        return "Producto eliminado exitosamente.";
                    }
                }
                else {
                    return "No se pudo eliminar el producto.";
                }
            }
            catch (error) {
                console.error("Error deleting product:", error);
                return "No se pudo eliminar el producto.";
            }
        });
    }
    updateProduct(id, nombre, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero obtenemos los datos actuales del producto
                const [currentData] = yield (0, mysql_1.query)("SELECT * FROM inventary WHERE id = ?", [id]);
                if (currentData.length === 0) {
                    return null; // Si no se encuentra el producto, retornamos null
                }
                // Actualizamos solo los campos proporcionados en la solicitud
                const currentProduct = currentData[0];
                const updatedProduct = {
                    nombre: nombre !== undefined ? nombre : currentProduct.nombre,
                    precio: precio !== undefined ? precio : currentProduct.precio,
                    stock: stock !== undefined ? stock : currentProduct.stock
                };
                // Ejecutamos la actualización
                const sql = "UPDATE inventary SET nombre = ?, precio = ?, stock = ? WHERE id = ?";
                const params = [updatedProduct.nombre, updatedProduct.precio, updatedProduct.stock, id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                if (result.affectedRows > 0) {
                    return new product_1.Product(id, updatedProduct.nombre, updatedProduct.precio, updatedProduct.stock);
                }
                else {
                    return null; // Si no se actualizó ninguna fila, devolvemos null
                }
            }
            catch (error) {
                console.error("Error updating product:", error);
                return null;
            }
        });
    }
}
exports.MysqlProductRepository = MysqlProductRepository;
