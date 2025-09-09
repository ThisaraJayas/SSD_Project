// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ firstName, lastName, email, password: hashedPassword });
//     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.status(201).json({ token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email }).select('+password');
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new Error('Invalid credentials');
//     }
//     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.status(201).json({ token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
