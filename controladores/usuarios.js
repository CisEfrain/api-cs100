 
const base64 = require("base-64");
const fs = require("fs");
const fetch = require("node-fetch");
let Entity = require("../modelos/usuario");
const jwt = require("jsonwebtoken");
exports.imagen = async (req, res) => {
  try {
    let uuid = req.params.uuid;

    let imagen = await fetch("http://api.cs100.cl/v1/workers/face/" + uuid)
      .then(res => {
        let dest = fs.createWriteStream("./img.png");
        return base64.encode(res.buffer());
      })
      .catch(error => console.log(error));

    res.status(200).json({ img: imagen });
  } catch (err) {
    res.status(500).json({ msg: "Hay un error" });
  }
};

exports.getw = function(req, res) {
  Entity.getOneWatcher(function(error, data) {
    //si existe
    if (typeof data !== "undefined" && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
