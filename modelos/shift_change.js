const Query = require("./querys/query.util");
const validate = require("./querys/validate.util");
var Model = {};
const table = "shift_change";
// Querys

const get = `SELECT * FROM ${table} `;
const getAllInCondo = `SELECT * FROM ${table} WHERE condo_id = ?`;
const getOne = `SELECT * FROM ${table} WHERE id = ?`;
const edit = `UPDATE ${table} SET ? WHERE id = ?`;
//const getOne = `SELECT * FROM ${table} WHERE ? ${field} = ?`;
const insert = `INSERT INTO ${table} SET ?`;
const eliminate = `DELETE FROM ${table} WHERE id = ?;`;
//const getWatcher = `SELECT * FROM ${table} WHERE = ? `;
Model.getAll = function(callback) {
  Query.find(get)
    .then(response => {
      callback(undefined, response);
    })
    .catch(err => {
      callback(err, undefined);
    });
};

Model.getAllInCondo = function(id, callback) {
  console.log("el id >>>> ", id);
  Query.findAllInCondo(getAllInCondo, id)
    .then(response => {
      callback(undefined, response);
    })
    .catch(err => {
      callback(err, undefined);
    });
};

Model.getOne = async function(id, callback) {
  findOne(getOne, id)
    .then(response => {
      callback(undefined, response);
    })
    .catch(err => {
      callback(err, undefined);
    });
};

Model.add = async function(data, callback) {
  let fields = ["worker_id", "turn_id", "condo_id"];
  console.log("model data add >>>>>", data);
  validate
    .fieldValidate(data, fields)
    .then(response => {
      Query.save(insert, data)
        .then(response => {
          console.log("token add inner >>>>>", response);
          callback(undefined, { insertId: response.insertId });
        })
        .catch(err => {
          console.log("token add inner error >>>>>", err);
          if (err.hasOwnProperty("errno") && err.errno == 1452)
            callback("error de relacion en bd", undefined);
          else callback(err, undefined);
        });
    })
    .catch(err => {
      console.log(err);
      callback(err, undefined);
    });
};
Model.edit = function(data, id, callback) {
  Query.update(edit, data, id)
    .then(response => {
      callback(undefined, { msg: response });
    })
    .catch(err => {
      callback(err, undefined);
    });
};
Model.delete = function(id, callback) {
  Query.remove(eliminate, id)
    .then(response => {
      console.log(response);
      callback(undefined, { msg: response });
    })
    .catch(err => {
      console.log(err);
      callback(err, undefined);
    });
};
module.exports = Model;
