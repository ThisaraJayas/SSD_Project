// MessageReplyController.js
import MessageReply from '../models/MessageReply.js';
import Message from '../models/Message.js';

// Create Reply
export const createReply = async (req, res) => {
    try {
        const userId = req.userId;
        const { messageId, reply } = req.body;
        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        const newReply = new MessageReply({ message: messageId, user: userId, reply });
        await newReply.save();
        message.replies.push(newReply._id);
        await message.save();

        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Replies by Message ID
export const getRepliesByMessageId = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const replies = await MessageReply.find({ message: messageId })
            .populate('user')
            .populate({ path: 'message', populate: { path: 'user' } });
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
