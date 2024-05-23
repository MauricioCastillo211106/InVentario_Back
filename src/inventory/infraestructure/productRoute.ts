import express  from "express";
import { createProductController,deleteProductController,getAllProductController } from "./dependencies";

export const productRouter = express.Router();

productRouter.post("/",createProductController.run.bind(createProductController));
productRouter.get("/", getAllProductController.run.bind(getAllProductController));
productRouter.delete("/:id", deleteProductController.run.bind(deleteProductController));