let express = require('express');
let router = express.Router();
let controladores = require(".././controladores");

/* TAREAS */
router.get("/tareas/:worker", controladores.tareas.getTrabajador)

/* USUARIOS */
router.get("/usuarios/imagen/:uuid", controladores.usuarios.imagen)

/* ASISTENCIAS */
router.post("/asistencias/cerrar/", controladores.asistencias.cerrarJornada)
/* RESIDENTES*/
router.post("/residentes/importar/", controladores.residentes.importarCsv)


module.exports = router;  

