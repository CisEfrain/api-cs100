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
          case 7:
            if (isVerified[ind][7].length > 5) {
              isVerified.splice([ind], 1)
            }
            break;
          case 8:
            isVerified[ind].splice(8, 0, parseInt(condos_id))
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
    /*    console.log("fieldsToFill", fieldsToFill)
       console.log("2", isVerified) */


    const insertResidents = `INSERT INTO residents(${fieldsToFill})VALUES ?`;
    console.log("2", insertResidents)
    await Query.saveMany(insertResidents, isVerified)
      .then(res => {
        console.log("residents imported", res)
        cb(undefined, { data: res })
      })
      .catch(err => {
        console.log("residents imported err", err)
        cb(err, undefined);
      }
      )
  }
};
