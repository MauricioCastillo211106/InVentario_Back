import { Request, Response } from "express";
import { CreateProductUseCase } from "../../appliaction/createProductUseCase";

export class CreateProductController {
    constructor(readonly createProductUseCase: CreateProductUseCase) { }

    async run(req: Request, res: Response) {
        try {

            const { nombre, precio, stock } = req.body;
            const createProduct = await this.createProductUseCase.run(nombre, precio, stock);

            if (createProduct) {
                return res.status(201).send({
                    createProduct
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