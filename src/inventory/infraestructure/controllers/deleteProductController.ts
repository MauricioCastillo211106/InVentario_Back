import { Request, Response } from "express";
import { DeleteProductUseCase } from "../../appliaction/deleteProductUseCase";

export class DeleteProductController {
    constructor (readonly deleteProductUseCase:DeleteProductUseCase){}
    async run( req:Request,res: Response){
        try {
            const {id}= req.params
            const idInt = parseInt(id, 10);
            const DeleteProduct = await this.deleteProductUseCase.run(idInt)

            if (DeleteProduct) {
                return res.status(200).send ({
                    DeleteProduct
                })
            } 
            else {
                res.status(404).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al crear un cliente prospecto, inténtalo más tarde"
                })
            }
        } catch (error) {
            if (error instanceof Error) {

                if (error.message.startsWith('[')) {

                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the book."
            });
        }
    }
}