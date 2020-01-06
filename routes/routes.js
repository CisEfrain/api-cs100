let express = require("express");
let router = express.Router();
let controladores = require(".././controladores");

/* TAREAS */
router.get("/tareas/:worker", controladores.tareas.getTrabajador);

/* USUARIOS */
router.get("/usuarios/imagen/:uuid", controladores.usuarios.imagen);

/* ASISTENCIAS */
router.post("/asistencias/cerrar/", controladores.asistencias.cerrarJornada);
/* RESIDENTES*/
router.post("/residentes/importar/", controladores.residentes.importarCsv);

/* COMPAÑIAS DE TRANSPORTE */

router.get("/shipping_company/", controladores.shipping_company.getAll);
router.get("/shipping_company/:id", controladores.shipping_company.getOne);
router.post("/shipping_company/", controladores.shipping_company.add);
router.put("/shipping_company/", controladores.shipping_company.edit);
router.delete("/shipping_company/:id", controladores.shipping_company.delete);
/* EVENTOS */

router.get("/event_category/", controladores.event_category.getAll);

module.exports = router;
