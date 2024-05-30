const bcrypt = require('bcrypt');
const { hashPassword, validatePassword } = require('../utils/passwordUtils');
const User = require('../models/user');

async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password does not meet the criteria: minimum 8 characters, at least one uppercase letter, one number, and one special character.' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create(username, hashedPassword);
    
    if (!newUser || newUser.length === 0) {
      throw new Error('User creation failed. No data returned.');
    }
    
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error); // Improved logging
    res.status(400).json({ error: error.message }); // Send detailed error message to frontend
  }
}



async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the hashed password is available in the user object
    const hashedPassword = user.Password;
    
    // Ensure both password and hashedPassword are provided and valid
    if (!password || !hashedPassword) {
      throw new Error('Invalid data. Password and hashed password are required.');
    }

    // Compare the provided password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Implement JWT token generation and authentication here
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'User not exist .Would you like to register ?' });
  }
}





module.exports = { register, login };
