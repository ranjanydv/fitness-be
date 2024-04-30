const jwt = require('jsonwebtoken');

const authJwt = require('./authJWT');

const authenticateUser = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
      if (err) {
        console.log('🚀 ~ file: authentication.js:16 ~ jwt.verify ~ err:', err);
        res.status(401).json({ message: 'Invalid Token' }); // Unauthenticated
      } else {
        req.user = authData;
        console.log(req.user);
        next();
      }
    });
  } else {
    res.status(403).json({ message: 'No token provided' });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error('Not Authorized to this route');
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
