import * as mysql from "mysql2/promise";  // Cambiado de `mysql.createPool` a `createPool`
import { Signale } from "signale";
import * as dotenv from "dotenv";

const signale = new Signale();
dotenv.config();

const config = {
    host: process.env.DB_HOST || 'db-mysql-nyc3-83614-do-user-15995791-0.c.db.ondigitalocean.com',
    user: process.env.DB_USER || 'doadmin',
    database: process.env.DB_DATABASE || 'defaultdb',
    password: process.env.DB_PASSWORD || 'AVNS_UhDoEZ8F7PjdMESOo2k',
    waitForConnections: true,
    sslmode: require,
    connectionLimit: 10,
};


// Crear el pool de conexiones
const pool = mysql.createPool(config);  // Cambiado de `mysql.createPool` a `createPool`

export async function query(sql: string, params: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}