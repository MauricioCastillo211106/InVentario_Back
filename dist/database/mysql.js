"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.query = void 0;
const mysql = __importStar(require("mysql2/promise")); // Cambiado de `mysql.createPool` a `createPool`
const signale_1 = require("signale");
const dotenv = __importStar(require("dotenv"));
const signale = new signale_1.Signale();
dotenv.config();
const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_DATABASE || 'inventary',
    password: process.env.DB_PASSWORD || 'Vaquito1234',
    waitForConnections: true,
    connectionLimit: 10,
};
// Crear el pool de conexiones
const pool = mysql.createPool(config); // Cambiado de `mysql.createPool` a `createPool`
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield pool.getConnection();
            signale.success("Conexión exitosa a la BD");
            const result = yield conn.execute(sql, params);
            conn.release();
            return result;
        }
        catch (error) {
            signale.error(error);
            return null;
        }
    });
}
exports.query = query;
