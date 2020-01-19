let Entity = require("../modelos/events");
let upload = require("../libs/image-upload");
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
  console.log(req.params);
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
  Entity.getOne(id, function(error, data) {
    //si existe
    if (typeof data !== "undefined" && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
exports.addMany = function(req, res) {
  /*     console.log(req) */

  /*   let body = req.body;
  var parsed = body.map(el => Object.values(el));
   res.status(200).json(parsed); 
  console.log(parsed); */
  /*   Entity.addMany(parsed, function(error, data) {
    //si existe
    if (typeof data !== "undefined") {
      res.status(200).json(data);
    } else if (error) {
      res.status(404).json({ msg: error });
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  }); */

  upload.array("images")(req, {}, function(err) {
    console.log(err);
    if (err) throw err;
    let shift_change_id = JSON.parse(req.body.shift_change);
    let eventsArray = JSON.parse(req.body.eventsData);
    console.log("req.body  2 ", eventsArray);
    let data = eventsArray.map(el => {
      return el;
    });
    console.log("data <<<<<>>>> ", data);
    var r = data.map(field => {
      console.log(field);
      let filtered;
      if (field.hasOwnProperty("imageName") && field.imageName) {
        filtered =
          req.files[
            req.files.findIndex(file => file.originalname === field.imageName)
          ];
        console.log("con imagen", filtered);
        return {
          shift_change_id: shift_change_id,
          category_id: field.category_id,
          comment: field.note,
          image_uuid: filtered.filename,
          image_mime: filtered.mimetype
        };
      } else {
        console.log("sin imagen", filtered);
        return {
          shift_change_id: shift_change_id,
          category_id: field.category_id,
          comment: field.note,
          image_uuid: "",
          image_mime: ""
        };
      }
    });
    var parsed = r.map(el => Object.values(el));
    console.log(parsed);
    Entity.addManyWithImages(parsed, function(error, data) {
      //si existe
      if (typeof data !== "undefined") {
        res.status(200).json(data);
      } else if (error) {
        res.status(404).json({ msg: error });
      } else {
        res.status(404).json({ msg: "No hay registro en la base de datos" });
      }
    });
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
