const Query = require("./querys/query.util");
const validate = require("./querys/validate.util");
var Model = {};
const table = "images";
// Querys

const get = `SELECT * FROM ${table} `;
const getOne = `SELECT * FROM ${table} WHERE id = ?`;
const getManyById = `SELECT * FROM ${table} WHERE shift_change_id = ?`;
const edit = `UPDATE ${table} SET ? WHERE id = ?`;
//const getOne = `SELECT * FROM ${table} WHERE ? ${field} = ?`;
const insert = `INSERT INTO ${table} SET ?`;
const insertMany = `INSERT INTO ${table} (image_uuid,image_mime,name) VALUES ?`;
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
  Query.findOne(getOne, id)
    .then(response => {
      callback(undefined, response);
    })
    .catch(err => {
      callback(err, undefined);
    });
};
Model.getManyById = async function(id, callback) {
  Query.findOne(getManyById, id)
    .then(response => {
      callback(undefined, response);
    })
    .catch(err => {
      callback(err, undefined);
    });
};
Model.add = async function(data, callback) {
  let fields = ["turn_id", "category_id"];
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
Model.addMany = async function(data, callback) {
  //let fields = ["turn_id", "category_id"];
  Query.saveMany(insertMany, data)
    .then(response => {
      callback(undefined, { insertId: response });
    })
    .catch(err => {
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
