"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.productRouter = express_1.default.Router();
exports.productRouter.post("/", dependencies_1.createProductController.run.bind(dependencies_1.createProductController));
exports.productRouter.get("/", dependencies_1.getAllProductController.run.bind(dependencies_1.getAllProductController));
exports.productRouter.delete("/:id", dependencies_1.deleteProductController.run.bind(dependencies_1.deleteProductController));
exports.productRouter.put("/:id", dependencies_1.updateProductontroller.run.bind(dependencies_1.updateProductontroller));
