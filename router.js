import express from 'express';

export const router = express.Router();

import { con } from './database/db.js'

router.get('/', (req, res) => {
    con.query('Select * from jugador', (error, result) => {
        if (error) {
            console.error(error);
        } else {
            res.render('index', { result: result });
        }
    })
});

router.post('/Consultar-Jugador', (req, res) => {
    con.query(`Select * from jugador natural join seleccion natural join posicion where id_jugador = ${req.body.id_jugador}`, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            res.render('consultar_jugador', { result: result });
        }
    })
});

router.get('/agregar', (req, res) => {
    res.render('agregar')
});

router.post('/agregar-jugador', (req, res) => {
    const nombre = req.body.nombre;
    const calificacion = req.body.calificacion;
    const seleccion = req.body.seleccion;
    const posicion = req.body.posicion;
    con.query("INSERT INTO `jugador` (`nombre`, `calificacion`, `id_seleccion`, `id_posicion`) VALUES ('"+nombre+"', '"+calificacion+"', '"+seleccion+"', '"+posicion+"');", (error, result) => {
        if (error) {
            console.error(error);
        } else {
            con.query('Select * from jugador', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    res.render('index', { result: result });
                }
            })
        }
    })
});

router.post('/eliminar', (req, res) => {
    con.query("DELETE FROM `jugador` WHERE (`id_jugador` = '"+req.body.id+"')", (error, result) => {
        if (error) {
            console.error(error);
        } else {
            con.query('Select * from jugador', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    res.render('index', { result: result });
                }
            })
        }
    })
});

router.post('/editar', (req, res) => {
    const result = { 
        id: req.body.id,
        nombre: req.body.nombre,
        calificacion: req.body.calificacion
    }
    res.render('editar', {result : result})
});

router.post('/editar-jugador', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const calificacion = req.body.calificacion;
    const seleccion = req.body.seleccion;
    const posicion = req.body.posicion;
    con.query("UPDATE `jugador` SET `nombre` = '"+nombre+"', `calificacion` = '"+calificacion+"', `id_seleccion` = '"+seleccion+"', `id_posicion` = '"+posicion+"' WHERE (`id_jugador` = '"+id+"');", (error, result) => {
        if (error) {
            console.error(error);
        } else {
            con.query('Select * from jugador', (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    res.render('index', { result: result });
                }
            })
        }
    })
});
