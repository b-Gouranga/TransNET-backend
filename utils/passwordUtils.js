const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

module.exports = {
  hashPassword,
  validatePassword,
};
