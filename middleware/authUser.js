const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get Token From Header
  const token = req.header('x-auth-token');

  //Check If No Token Found
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify Token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('Something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
