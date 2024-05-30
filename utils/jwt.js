
const jwt = require('jsonwebtoken');

const generateToken = (User) => {
  return jwt.sign({ id: User.id, Username: User.Username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = generateToken;
