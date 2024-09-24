const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      middleName,
      lastName,
      tinNumber,
      shopName,
      shopAddress,
    } = req.body;
    const user = new User({
      username,
      password,
      firstName,
      middleName,
      lastName,
      tinNumber,
      shopName,
      shopAddress,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(200).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(200).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user._id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(200).json({ token, message: 'success' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
