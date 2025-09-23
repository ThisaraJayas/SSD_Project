const Message = require('../models/Message');
const Post = require('../models/Post');

// Create Message
exports.createMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId, fullName, email, mobileNo, message } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const newMessage = new Message({ post: postId, user: userId, fullName, email, mobileNo, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Messages by User ID
exports.getMessagesByUserId = async (req, res) => {
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
// exports.getReceivedMessages = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const messages = await Message.find({ user: userId }).populate({path: 'post', populate:{path:'user'}}).populate({path :'replies', populate:{path: 'user'}}).populate('user');
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const mongoose = require('mongoose');
// exports.getReceivedMessages = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const userObjectId = new mongoose.Types.ObjectId(userId);

//         console.log("Logged-in User ID (ObjectId):", userId);

//         const messages = await Message.find({ 'post.user': userObjectId })
//             .populate({ path: 'post', populate: { path: 'user' } })
//             .populate({ path: 'replies', populate: { path: 'user' } })
//             .populate('user');

//         console.log("Messages found:", messages); // Log found messages
        
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


exports.getReceivedMessages = async (req, res) => {
    try {
        const userId = req.userId;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // First, find all posts created by the logged-in user
        const posts = await Post.find({ user: userObjectId });

        // Extract the post IDs
        const postIds = posts.map(post => post._id);

        console.log("Post IDs for the logged-in user:", postIds);

        // Now, find messages where the post is one of the user's posts
        const messages = await Message.find({ post: { $in: postIds } })
            .populate({ path: 'post', populate: { path: 'user' } }) // Populate post and its author
            .populate({ path: 'replies', populate: { path: 'user' } }) // Populate replies and their authors
            .populate('user'); // Populate the sender of the message

        console.log("Messages found:", messages);

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
