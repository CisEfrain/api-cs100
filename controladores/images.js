let upload = require("../libs/image-upload");
let Entity = require("../modelos/images");
exports.add = function(req, res) {
  /* console.log("add image >>>", req.files);
  console.log("add image2  >>>", req.file);
  console.log("add image >>>", req.body); */

  upload.array("images")(req, {}, function(err) {
    if (err) throw err;
    /*     console.log(req) */
    /*   console.log(req.body); */
    let data = req.body.name.map(el => {
      return JSON.parse(el);
    });
    /*     console.log(data); */
    data = [];
    data.push({ name: "name10.hola", imageName: "" });
    data.push({ name: "name222.hola", imageName: "" });
    data.push({ name: "name13330.hola", imageName: "" });
    var r = data.map(field => {
      console.log(req.files);
      let filtered;
      if (field.hasOwnProperty("imageName") && field.imageName) {
        filtered =
          req.files[
            req.files.findIndex(file => file.originalname === field.imageName)
          ];
        console.log("con imagen", filtered);
        return {
          image_uuid: filtered.filename,
          image_mime: filtered.mimetype,
          name: field.name
        };
      } else {
        console.log("sin imagen", filtered);
        return {
          image_uuid: "",
          image_mime: "",
          name: field.name
        };
      }
    });
    var parsed = r.map(el => Object.values(el));
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
  });
};
