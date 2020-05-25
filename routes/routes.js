let express = require("express");
let router = express.Router();
let controladores = require(".././controladores");
let verifyToken = require("../shared/verifyToken");

/*emails*/
router.post("/request-password/", controladores.mailer.sendEmail);

/* IMAGES*/
router.post("/images/", controladores.images.addArray);
router.post("/image/", controladores.images.add);

/* TAREAS */
router.get("/tareas/:worker", controladores.tareas.getTrabajador);

/* USUARIOS */
router.get("/usuarios/imagen/:uuid", controladores.usuarios.imagen);
router.get("/watchers/", controladores.usuarios.getw);

/* ASISTENCIAS */
router.post("/asistencias/cerrar/", controladores.asistencias.cerrarJornada);
/* RESIDENTES*/
router.post(
  "/residentes/importar/",
  verifyToken,
  controladores.residentes.importarCsv
);

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
router.get("/shift_change/self/", controladores.shift_change.getAllInCondo);
router.get("/shift_change/many/", controladores.shift_change.getAllInCondo);
router.get("/shift_change/:id", controladores.shift_change.getOne);
router.get(
  "/shift_change/events/:id",
  controladores.shift_change.getOneByChecksId
);
router.post("/shift_change/", controladores.shift_change.add);
router.put("/shift_change/", controladores.shift_change.edit);
router.put(
  "/shift_change/receive_guard/:id",
  controladores.shift_change.receiveGuard
);
router.delete("/shift_change/:id", controladores.shift_change.delete);

/* RECEPCION DE PAQUETES*/

router.get(
  "/package_reception/",
  verifyToken,
  controladores.package_reception.getAll
);
router.get(
  "/package_reception/self/",
  verifyToken,
  controladores.package_reception.getAllInCondo
);
router.get(
  "/package_reception/me/",
  verifyToken,
  controladores.package_reception.getAllByUser
);

router.get("/package_reception/:id", controladores.package_reception.getOne);
router.post("/package_reception/", controladores.package_reception.add);
router.put("/package_reception/", controladores.package_reception.edit);
router.put(
  "/package_reception/deliver/:id",
  controladores.package_reception.editOne
);
router.put(
  "/package_reception/deliver-with-file/:id",
  controladores.package_reception.editOneWithImage
);
router.put(
  "/package_reception/receive/:id",
  controladores.package_reception.receive
);
router.delete("/package_reception/:id", controladores.package_reception.delete);
module.exports = router;
