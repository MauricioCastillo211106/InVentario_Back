import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../appliaction/updateProductUseCase";


export class UpdateProductontroller{

    constructor(readonly updateProductUseCase:UpdateProductUseCase){};

    async run(req:Request, res:Response){
        try {
            let {id} = req.params;
            const idInt = parseInt(id, 10);
            let{nombre,precio,stock} = req.body;
            const updateProduct= await this.updateProductUseCase.run(idInt,nombre,precio,stock)

            if (updateProduct) {
                return res.status(200).send(updateProduct);
            }
            else {
                res.status(404).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al actualizar el ingrediente"
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
                message: "An error occurred while adding the ingrediente."
            });
        }
    }
    
}