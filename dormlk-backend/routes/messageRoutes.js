const express = require('express');
const { createMessage, getMessagesByUserId, getReceivedMessages } = require('../controllers/MessageController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createMessage);
router.get('/user/:userId', authenticate, getMessagesByUserId);
router.get('/received', authenticate, getReceivedMessages);

module.exports = router;
