import mysql from 'mysql2'

import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from '../config.js'

export const con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
});

con.connect(error => {
    if (error) {
        console.log('El error de conexión es: ' + error.message);
        return;
    } 
    console.log('Conectado');
})
