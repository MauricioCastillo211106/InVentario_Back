import { Request, Response } from "express";
import { GetAllProductUseCase } from "../../appliaction/getAllProductUseCase";


export class GetAllProductController{
    constructor(readonly getAllProductUseCase:GetAllProductUseCase){}

    async run(req:Request, res:Response){
        try {
            const getAll = await this.getAllProductUseCase.run();

            if (getAll) {
                return res.status(200).send({
                    getAll
                })
            }
            else {
                res.status(404).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error"
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