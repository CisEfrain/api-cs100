let DB = require("./db.js");

const Query = require("./querys/query.util");
const validate = require("./querys/validate.util");
let usuario = {};

usuario.getOne = function(id, callback) {
  var q = "SELECT * FROM workers WHERE id = ?";

  DB.getConnection(function(err, connection) {
    connection.query(q, id, function(err, rows) {
      if (err) throw err;
      else callback(null, rows);

      connection.release();
    });
  });
};
usuario.getOneWatcher = function(callback) {
  DB.getConnection(function(err, connection) {
    connection.query(
      {
        sql:
          "SELECT username FROM watchers LEFT JOIN package_reception ON (package_reception.worker_id=watchers.id)",
        nestTables: true
      },
      function(err, rows) {
        if (err) throw err;
        else callback(null, rows);

        connection.release();
      }
    );
  });
};
module.exports = usuario;
