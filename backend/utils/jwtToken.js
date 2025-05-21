// const sendToken = (user, statusCode, res) => {
//     // Create JWT token
//     const token = user.getJWTToken();

//     // Options for cookie
//     const options = {
//         expires: new Date(
//             Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true,
//     };

//     res.status(statusCode).cookie('token', token, options).json({
//         success: true,
//         token,
//         user,
//     });
// }

// module.exports = sendToken;

const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};