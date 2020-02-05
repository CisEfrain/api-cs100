const DB = require("../db");
var mysql = require("mysql");
const moment = require("moment");
moment.prototype.toMySqlDateTime = function() {
  return this.format("YYYY-MM-DD HH:mm:ss");
};

exports.find = async function(query) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      connection.query(query, function(err, result) {
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};

exports.findAllInCondo = async function(query, id) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      connection.query(query, id, function(err, result) {
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};
exports.findMany = async function(query) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      connection.query(query, function(err, result) {
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};
exports.findOne = async function(query, find) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      connection.query(query, find, function(err, result) {
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};
exports.save = async function(query, data) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      connection.query(query, data, function(err, result) {
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};

exports.saveMany = async function(query, data) {
  //data is array of string ['val1', 'val2', 'val3']
  // use Object.values(Obj) to convert object to array
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      connection.query(query, [data], function(err, result) {
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};
exports.update = async function(query, body, id) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      if (err) reject(err);
      connection.query(query, [body, id], function(err, result) {
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};

exports.updateOne = async function(query, value, id) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      if (err) reject(err);

      let sql = connection.format(query, [
        value,
        moment(Date.now()).toMySqlDateTime(),
        id
      ]);
      console.log("sql 1 >>> ", sql);
      connection.query(sql, function(err, result) {
        console.log(this.sql);
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};

exports.updateOneWithImage = async function(
  query,
  comment,
  filename,
  mimetype,
  id
) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      if (err) reject(err);

      let sql = connection.format(query, [
        comment,
        moment(Date.now()).toMySqlDateTime(),
        filename,
        mimetype,
        id
      ]);
      console.log("sql 1 >>> ", sql);
      connection.query(sql, function(err, result) {
        console.log(this.sql);
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};
exports.remove = async function(query, find) {
  return await new Promise((resolve, reject) => {
    DB.getConnection(function(err, connection) {
      connection.query(query, find, function(err, result) {
        connection.release();
        return err ? reject(err) : resolve(result);
      });
    });
  });
};
