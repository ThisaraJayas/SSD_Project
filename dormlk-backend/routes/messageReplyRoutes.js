const express = require('express');
const { createReply, getRepliesByMessageId } = require('../controllers/MessageReplyController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createReply);
router.get('/:messageId', authenticate, getRepliesByMessageId);

module.exports = router;
