import express, { Request, Response } from 'express';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

const app = express();

// Configuración del proxy para serviceA
const serviceAProxy = createProxyMiddleware({
    target: 'http://localhost:3001', // Cambia esto a la URL de tu servicio A
    changeOrigin: true,
    pathRewrite: {
      '^/serviceA': '', // Reescribe la URL para eliminar el prefijo
    },
  });
  
  // Configuración del proxy para serviceB
const serviceBProxy = createProxyMiddleware({
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
