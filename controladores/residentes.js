let residentes = require("../modelos/residentes");

exports.importarCsv = function(req, res) {
  /* console.log("data >>>> ", req.body); */
  var data = req.body;

  if (!data) {
    return res.status(500).json({
      msg: "no se recibio correctamente los datos",
      data
    });
  }

  var parsed = data.map(el => {
    return el.email;
  });
  console.log(parsed);
  residentes.verificar(parsed, function(error, result) {
    //si existe
    if (typeof result !== "undefined" && result.length > 0) {
      res.status(200).json({
        msg: "los datos son >>>",
        result
      });
    } else {
      res.status(404).json({ msg: "No hay registro en la base de datos" });
    }
  });
};
residentes.importar(data,function(error,result){
});