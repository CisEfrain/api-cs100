let residentes = require("../modelos/residentes");
var lodash = require("lodash");

exports.importarCsv = async function(req, res) {
  /* console.log("data >>>> ", req.body); */
  var condos_id = req.header("condos_id");

  console.log("headerss >>>", condos_id);
  var data = req.body;
  var values = [];
  if (!data) {
    return res.status(500).json({
      msg: "no se recibio correctamente los datos",
      data
    });
  }

  var parsed = await data.map(el => {
    return el.email;
  });

  residentes.verificar(parsed, async function(error, result) {
    //si existe
    if (typeof result !== "undefined" && result.length > 0) {
      await result.forEach(async function(item1) {
        await data.forEach(item2 => {
          if (item1.email != item2.email) {
            values.push(item2);
          }
        });
      });

      residentes.importar(values, condos_id, function(error, response) {
        if (typeof response !== "undefined") {
          res.status(200).json({
            msg: "los datos son >>>",
            response
          });
        } else {
          res.status(404).json({
            msg: error,
            response
          });
        }
      });
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
