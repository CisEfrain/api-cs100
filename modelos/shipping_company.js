
const Query = require("./querys/query.util");
const validate = require("./querys/validate.util");
var Model = {};
const table = "shipping_company";
// Querys

const get = `SELECT * FROM ${table} `;
const getOne = `SELECT * FROM ${table} WHERE id = ?`;
const edit = `UPDATE ${table} SET ? WHERE id = ?`;
//const getOne = `SELECT * FROM ${table} WHERE ? ${field} = ?`;
const insert = `INSERT INTO ${table} SET ?`;
const eliminate = `DELETE FROM ${table} WHERE id = ?;`;

Model.getAll = function(callback) {
  Query.find(get)
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
  let fields = ["name"];
  validate
    .fieldValidate(data, fields)
    .then(response => {
      Query.save(insert, data)
        .then(response => {
          callback(undefined, { insertId: response.insertId });
        })
        .catch(err => {
          callback(err, undefined);
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
