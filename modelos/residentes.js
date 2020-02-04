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

residentes.importar = function(filtrados, condos_id, callback) {
  var values = filtrados.map(el => {
    return `('${el.nombre ? el.nombre : "vacio"}','${
      el.email ? el.email : "vacio"
    }','25f9e794323b453885f5181f1b624d0b',${
      el.telefono ? el.telefono : "vacio"
    },${el.comite && el.comite == "si" ? 1 : 0},${el.rut ? el.rut : "vacio"},${
      el.departamento ? el.departamento : "vacio"
    },${condos_id},1)`;
  });

  var consulta = `INSERT INTO residents(name,email,password,phone,committee,rut, departament,condos_id,approved) VALUES ${values.join(
    ","
  )}`;
  console.log("consulta >>>>> ", consulta);

  DB.getConnection(function(err, connection) {
    connection.query(consulta, function(err, rows) {
      if (err) callback(null, err);
      else callback(null, rows);
      connection.release();
    });
  });

  /*   err = false;
  if (err) throw err;
  else callback(null, consulta); */
};
module.exports = residentes;
