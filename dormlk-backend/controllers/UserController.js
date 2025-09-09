const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token });
        console.log("Success Regis",token);
        
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const user = await User.findById(req.userId);
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
