const DB = require("./db.js");
const Query = require("./querys/query.util");
//var residentes = {};
const table = "residents";

module.exports = residents = {
  async verify(data, cb) {
    if (!data) throw Error("No data");

    const parsedEmails = data.join("','");
    const getEmails = `SELECT id,email FROM ${table} WHERE email IN ('${parsedEmails}') ORDER BY id desc`;

    const emailsInDB = await Query.findMany(getEmails);
    emailsInDB ? cb(undefined, emailsInDB) : cb(error, undefined);
  },

  async importResidents(isVerified, condos_id, cb) {
    const fields = [
      "name",
      "email",
      "password",
      "phone",
      "committee",
      "rut",
      "departament",
      "percentage",
      "condos_id",
      "approved",
    ];
    console.log(isVerified)
    fields.map((e, i) => {
      isVerified.map((el, ind) => {
        switch (i) {
          case 2:
            isVerified[ind].splice(2, 0, "25f9e794323b453885f5181f1b624d0b");
            break;
          case 4:
            el[4] === "si"
              ? isVerified[ind].splice(4, 1, 1)
              : isVerified[ind].splice(4, 1, 0);
            break;
          case 8:
            isVerified[ind].splice(8, 0, condos_id)
            break;
          case 9:
            isVerified[ind].splice(9, 0, 1)
            break;
          default:
            break;
        }
      });
    });

    const fieldsToFill = fields.join(",");
    console.log("fieldsToFill", fieldsToFill)
    console.log("2", isVerified)
    

    const insertResidents = `INSERT INTO residents(${fieldsToFill})VALUES ?`;
    console.log("2", insertResidents)
    const residentsImported = await Query.saveMany(insertResidents, isVerified);

    residentsImported
      ? cb(undefined, { data: residentsImported })
      : cb(error, undefined);
  }
};

//1.name, 2.email, 3.pass, 4.phone, 5.committee, 6.rut, 7.departament, 8.condos_id

// var insertarResidente = `INSERT INTO ${table} SET ?`;
// var obtenerResidentePorCorreo;
// residentes.verificar = function(data, callback) {
//   if (!data) throw Error("sin datos para consulta");
//   obtenerResidentePorCorreo = `SELECT id,email FROM ${table} WHERE email IN ('${data.join(
//     "','"
//   )}') ORDER BY id desc`;
//   DB.getConnection(function(err, connection) {
//     connection.query(obtenerResidentePorCorreo, function(err, rows) {
//       if (err) throw err;
//       else callback(null, rows);
//       connection.release();
//     });
//   });
//   /*   callback(null,  obtenerResidentePorCorreo ); */
// };

// residentes.importar = function(filtrados, condos_id, callback) {
//   var values = filtrados.map(el => {
//     return `('${el.nombre ? el.nombre : "vacio"}','${
//       el.email ? el.email : "vacio"
//     }','25f9e794323b453885f5181f1b624d0b',${
//       el.telefono ? el.telefono : "vacio"
//     },${el.comite && el.comite == "si" ? 1 : 0},${el.rut ? el.rut : "vacio"},${
//       el.departamento ? el.departamento : "vacio"
//     },${condos_id},1)`;
//   });

//   var consulta = `INSERT INTO residents(name,email,password,phone,committee,rut, departament,condos_id,approved) VALUES ${values.join(
//     ","
//   )}`;
//   console.log("consulta >>>>> ", consulta);

//   DB.getConnection(function(err, connection) {
//     connection.query(consulta, function(err, rows) {
//       if (err) callback(null, err);
//       else callback(null, rows);
//       connection.release();
//     });
//   });

//   /*   err = false;
//   if (err) throw err;
//   else callback(null, consulta); */
// };
//module.exports = residentes;