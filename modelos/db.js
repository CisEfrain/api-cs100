var mysql   = require("mysql");
var configuracion = require("../config/config.js");


var pool = mysql.createPool({
    connectionLimit : configuracion.db.connectionLimit,
    host: configuracion.db.host,
    user: configuracion.db.user,
    password: configuracion.db.password,
    database: configuracion.db.database
});

module.exports = pool;