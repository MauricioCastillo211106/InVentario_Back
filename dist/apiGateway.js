"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const app = (0, express_1.default)();
// Configuración del proxy para serviceA
const serviceAProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:3001', // Cambia esto a la URL de tu servicio A
    changeOrigin: true,
    pathRewrite: {
        '^/serviceA': '', // Reescribe la URL para eliminar el prefijo
    },
});
// Configuración del proxy para serviceB
const serviceBProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:8080', // Cambia esto a la URL de tu servicio B
    changeOrigin: true,
    pathRewrite: {
        '^/serviceB': '', // Reescribe la URL para eliminar el prefijo
    },
});
// Usar los proxies en las rutas
app.use('/inventory', serviceAProxy);
app.use('/orders', serviceBProxy);
// Iniciar el servidor de la API Gateway
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
