let Entity = require("../modelos/package_reception");
const jwt = require("jsonwebtoken");
const moment = require("moment");
/* moment.prototype.toMySqlDateTime = function () {
  return this.format('YYYY-MM-DD HH:mm:ss');
}; */

exports.getAll = function(req, res) {
  Entity.getAll(function(error, data) {
    //si existe

    if (data !== "undefined" && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
exports.getOne = function(req, res) {
  Entity.getOne(req.params.id, function(error, data) {
    //si existe
    if (typeof data !== "undefined" && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
exports.getAllInCondo = function(req, res) {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  let decoded = jwt.verify(`${token}`, "bazam");
  console.log("decoded >>>>", decoded);
  if (token) {
    Entity.getAllInCondo(decoded.condo_id, function(error, data) {
      //si existe
      if (typeof data !== "undefined") {
        res.status(200).json(data);
      } else {
        res.status(404).json({ msg: "No hay registro en la base de datos" });
      }
    });
  } else {
    res.status(500).json({ msg: "No se recibio token" });
  }
  /* res.status(200).json(decoded); */
};

exports.add = function(req, res) {
  let body = req.body;
  let token = req.headers.authorization.split(" ")[1];
  console.log("token add >>>>>", token);
  let decoded = jwt.verify(`${token}`, "bazam");
  console.log("token add >>>>>", decoded);
  if (token) {
    Entity.add(body, function(error, data) {
      //si existe
      if (typeof data !== "undefined") {
        res.status(200).json(data);
      } else if (error) {
        console.log("error add elseif >>>>", error);
        res.status(404).json({ msg: error });
      } else {
        res.status(404).json({ msg: "No hay registro en la base de datos" });
      }
    });
  } else {
    res.status(500).json({ msg: "No se recibio token" });
  }
};
exports.receiveGuard = function(req, res) {
  let body = req.body.id;
  let id = req.params.id;
  Entity.edit({ checked_by: body }, id, function(error, data) {
    //si existe
    if (typeof data !== "undefined") {
      res.status(200).json({ msg: "datos actualizados" });
    } else if (err) {
      res.status(500).json({ msg: "error " + error });
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
