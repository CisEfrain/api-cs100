// let residentes = require("../modelos/residentes");
// var lodash = require("lodash");

const residents = require("../modelos/residentes");

exports.importarCsv = async function(req, res) {
  const { body } = req;
  !res.decodedToken.condo_id &&
    res.status(400).json({
      msg: "condo id not found"
    });
  const condos_id = res.decodedToken.condo_id;

  /* .CVS FILE HAS NOT BEEN SENDED */

  !body &&
    res.status(400).json({
      msg: "Data do not exist"
    });

  /* CONVERT DATA */
  const values = body.map(e => Object.values(e));
  const emailsToVerify = body.map(e => e.email);

  /* SET EMPTY ARRAY TO SAVE ALL OF EMAILS THAT NOT EXIST ON DB */
  const isVerified = [];

  /* VERIFY EMAILS HAS NOT IN DB */
  await residents.verify(emailsToVerify, async (error, result) => {
    const emailsFromDB = await result.map(e => e.email);
    values.filter(el => !emailsFromDB.includes(el[1]) && isVerified.push(el));
  });

  /* REMOVE EMPTY ARRAYS IF EXIST  */
  const isVerifyFiltered = isVerified.filter(e => e.length > 1);

  /* IMPORT NEW RESIDENTS */
  await residents.importResidents(
    isVerifyFiltered,
    condos_id,
    (error, response) => {
      response
        ? res.status(200).json({ msg: "success", response })
        : res.status(400).json({ msg: error, error });
    }
  );
};

// exports.importarCsv = async function(req, res) {
//   /* console.log("data >>>> ", req.body); */
//   var condos_id = req.header("condos_id");

//   console.log("headerss >>>", condos_id);
//   var data = req.body;
//   var values = [];
//   if (!data) {
//     return res.status(500).json({
//       msg: "no se recibio correctamente los datos",
//       data
//     });
//   }

//   var parsed = await data.map(el => {
//     return el.email;
//   });

//   residentes.verificar(parsed, async function(error, result) {
//     //si existe
//     if (typeof result !== "undefined" && result.length > 0) {
//       await result.forEach(async function(item1) {
//         await data.forEach(item2 => {
//           if (item1.email != item2.email) {
//             values.push(item2);
//           }
//         });
//       });

//       residentes.importar(values, condos_id, function(error, response) {
//         if (typeof response !== "undefined") {
//           res.status(200).json({
//             msg: "los datos son >>>",
//             response
//           });
//         } else {
//           res.status(404).json({
//             msg: error,
//             response
//           });
//         }
//       });
//     } else {
//       res.status(404).json({ msg: "No hay registro en la base de datos" });
//     }
//   });
// };
