const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

 const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return token;
};

 const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 'Fail',
      mesage: 'No token supplied'
    });
  }
  jwt.verify(token, process.env.SECRETKEY, (error, authData) => {
    if (error) {
      if (error.message.includes('signature')) {
        return res.status(403).json({
          status: 'Fail',
          message: 'Invalid token supplied'
        });
      }
      return res.status(403).json({
        message: error
      });
    }
    req.authData = authData;
    return next();
  });
};

 const isAdminUser = (req, res, next) => {
  const { jobrole } = req.authData.payload;
  if (jobrole === 'admin') {
    return next();
  }
  return res.status(401).json({
    status: 'Fail',
    message: 'You are not authorized to access this route'
  });
};

 module.exports = { verifyToken, createToken, isAdminUser }