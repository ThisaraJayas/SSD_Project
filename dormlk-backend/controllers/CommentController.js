const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create Comment
exports.createComment = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId, content, starRating } = req.body;
        console.log(userId);
        console.log("Postud ",postId);
        
        
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const newComment = new Comment({ post: postId, user: userId, content, starRating });
        await newComment.save();
        post.reviews.push(newComment._id);
        await post.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Comments by Post ID
exports.getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ post: postId }).populate('user');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
