const express = require('express');
const { registerUser, loginUser, getUserProfile, changePassword } = require('../controllers/UserController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUserProfile);
router.put('/change-password', authenticate, changePassword);

module.exports = router;
