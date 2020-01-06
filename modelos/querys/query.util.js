const DB = require("../db");

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
