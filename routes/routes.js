let express = require("express");
let router = express.Router();
let controladores = require(".././controladores");
let upload = require("../libs/image-upload");
/* IMAGES*/
router.post("/images/", upload.array("images"), controladores.images.add);

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

/* CATEGORIAS DE EVENTOS */

router.get("/event_category/", controladores.event_category.getAll);
router.get("/event_category/:id", controladores.event_category.getOne);
router.post("/event_category/", controladores.event_category.add);
router.put("/event_category/", controladores.event_category.edit);
router.delete("/event_category/:id", controladores.event_category.delete);

/* EVENTOS */

router.get("/events/", controladores.events.getAll);
router.get("/events/:id", controladores.events.getOne);
router.post("/events/", controladores.events.add);
router.get("/events/many/:id", controladores.events.getManyById);
router.post("/events/many", controladores.events.addMany);
router.put("/events/", controladores.events.edit);
router.delete("/events/:id", controladores.events.delete);

/* TURNOS  */

router.get("/turns/", controladores.turns.getAll);
router.get("/turns/:id", controladores.turns.getOne);
router.post("/turns/", controladores.turns.add);
router.put("/turns/", controladores.turns.edit);
router.delete("/turns/:id", controladores.turns.delete);

/* CAMBIO DE TURNO  */

router.get("/shift_change/", controladores.shift_change.getAll);
router.get("/shift_change/many/", controladores.shift_change.getAllInCondo);
router.get("/shift_change/:id", controladores.shift_change.getOne);
router.post("/shift_change/", controladores.shift_change.add);
router.put("/shift_change/", controladores.shift_change.edit);
router.put(
  "/shift_change/receive_guard/:id",
  controladores.shift_change.receiveGuard
);
router.delete("/shift_change/:id", controladores.shift_change.delete);

module.exports = router;
