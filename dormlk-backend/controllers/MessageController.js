// MessageController.js
import Message from '../models/Message.js';
import Post from '../models/Post.js';
import mongoose from 'mongoose';

// Create Message
export const createMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId, fullName, email, mobileNo, message } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newMessage = new Message({ post: postId, user: userId, fullName, email, mobileNo, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Messages by User ID
export const getMessagesByUserId = async (req, res) => {
   try {
        const userId = req.params.userId;
        // const messages = await Message.find({ user: userId }).populate({path: 'post', populate:{path:'user'}}).populate({path :'replies', populate:{path: 'user'}}).populate('user');
         // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        // Use parameterized approach

        const messages = await Message.find({ 
            user: { $eq: new mongoose.Types.ObjectId(userId) } 
        }).populate({path: 'post', populate:{path:'user'}}).populate({path :'replies', populate:{path: 'user'}}).populate('user');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Received Messages
export const getReceivedMessages = async (req, res) => {
    try {
        const userId = req.userId;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const posts = await Post.find({ user: userObjectId });
        const postIds = posts.map(post => post._id);

        const messages = await Message.find({ post: { $in: postIds } })
            .populate({ path: 'post', populate: { path: 'user' } })
            .populate({ path: 'replies', populate: { path: 'user' } })
            .populate('user');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
