const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Get user profile using ID from token
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude the password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit user profile using ID from token
exports.editUser = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      tinNumber,
      shopName,
      telephone,
      shopAddress,
      username, // Include username in the update
      password, // Include password in the update
    } = req.body;

    console.log('body', req.body);

    // Create an object to store the fields to update
    const updatedFields = {
      firstName,
      middleName,
      lastName,
      tinNumber,
      shopName,
      telephone,
      shopAddress,
      username,
    };

    // If the password is provided, hash it and add it to the update object
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedFields.password = hashedPassword; // Update the hashed password
    }

    // Find user by ID and update with new details
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedFields,
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from the response

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    // Return the updated user
    res
      .status(200)
      .json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
