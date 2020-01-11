let Entity = require("../modelos/events");

exports.getAll = function(req, res) {
  Entity.getAll(function(error, data) {
    //si existe
    if (typeof data !== "undefined" && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
exports.getManyById = function(req, res) {
  let id = req.params.id;
  Entity.getManyById(id, function(error, data) {
    //si existe
    if (typeof data !== "undefined" && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
exports.getOne = function(req, res) {
  let id = req.params.id;
  Entity.getOne(req.params.id, function(error, data) {
    //si existe
    if (typeof data !== "undefined" && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
exports.addMany = function(req, res) {
  let body = req.body;
  var parsed = body.map(el => Object.values(el));
  /* res.status(200).json(parsed); */
  console.log(parsed);
  Entity.addMany(parsed, function(error, data) {
    //si existe
    if (typeof data !== "undefined") {
      res.status(200).json(data);
    } else if (error) {
      res.status(404).json({ msg: error });
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
exports.add = function(req, res) {
  let body = req.body;
  Entity.add(body, function(error, data) {
    //si existe
    if (typeof data !== "undefined") {
      res.status(200).json(data);
    } else if (error) {
      res.status(404).json({ msg: error });
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};

exports.edit = function(req, res) {
  let body = req.body;
  let id = req.body.id;
  Entity.edit(body, id, function(error, data) {
    //si existe
    if (typeof data !== "undefined") {
      res.status(200).json({ msg: "datos actualizados" });
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};

exports.delete = function(req, res) {
  let id = req.params.id;
  Entity.delete(id, function(error, data) {
    //si existe
    if (typeof data !== "undefined") {
      res.status(200).json({ msg: "elemento eliminado" });
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
