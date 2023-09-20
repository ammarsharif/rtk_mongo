const jwt = require('jsonwebtoken');
const secretKey = 'My_Secret_Key';

const createAuthorizationToken = (user) => {
  console.log('USER', user);
  return jwt.sign(
    {
      data: { email: user.email, id: user._id },
    },
    secretKey,
    { expiresIn: 24 * 60 * 60 }
  );
};
const verifyToken = (req) => {
  try {
    const auth = req.headers.authorization;
    if (auth) {
      const authToken = auth.split('Bearer ')[1];
      console.log(authToken);
      jwt.verify(authToken, secretKey);
      return true;
    } else {
      console.log('Authorization header missing');
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = {
  verifyToken,
  createAuthorizationToken,
};
