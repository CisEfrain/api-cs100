const DB = require("./db.js");

var residentes = {};
const table = "residents";
// Querys

var insertarResidente = `INSERT INTO ${table} SET ?`;
var obtenerResidentePorCorreo;
residentes.verificar = function(data, callback) {
  if (!data) throw Error("sin datos para consulta");
  obtenerResidentePorCorreo = `SELECT id,email FROM ${table} WHERE email IN ('${data.join(
    "','"
  )}') ORDER BY id desc`;

  DB.getConnection(function(err, connection) {
    connection.query(obtenerResidentePorCorreo, function(err, rows) {
      if (err) throw err;
      else callback(null, rows);
      connection.release();
    });
  });
  /*   callback(null,  obtenerResidentePorCorreo ); */
};

residentes.importar(function data,callback){
`	INSERT INTO 
projects(name, start_date, end_date)
VALUES
('AI for Marketing','2019-08-01','2019-12-31'),
('ML for Sales','2019-05-15','2019-11-20');
`
}
module.exports = residentes;
