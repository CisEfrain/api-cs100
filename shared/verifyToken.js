const jwt = require("jsonwebtoken");

const verifyToken = function(req, res, next) {
  let token;
  let decoded;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      decoded = jwt.verify(`${token}`, "bazam");
      res.decodedToken = decoded;
      next();
    } else {
      throw { message: "token not recieved" };
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

module.exports = verifyToken;
