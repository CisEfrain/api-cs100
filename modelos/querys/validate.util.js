exports.fieldValidate = async function(obj, fields) {
  return await new Promise((resolve, reject) => {
    if (!obj || obj.length <= 0) {
      reject({
        valid: false,
        error: "objeto no definido"
      });
    } else if (!fields || fields.length <= 0) {
      reject({
        valid: false,
        error: "modelo no definido"
      });
    } else {
      fields.forEach(function(el, i, array) {
        if (!obj.hasOwnProperty(el)) {
          reject({
            valid: false,
            error: `error de validacion no se encontro: ${el}`
          });
        }
        if (i === array.length - 1) {
          resolve({
            valid: true,
            error: false
          });
        }
      });
    }
  });
};
