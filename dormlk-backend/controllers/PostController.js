const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
    try {
        const userId = req.userId;
        const postData = req.body;
        const newPost = new Post({ ...postData, user: userId });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').populate('reviews');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update Post Status
exports.updatePostStatus = async (req, res) => {
    try {
        const { postId, status } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.postStatus = status;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get Post by District
exports.getPostByDistrict = async (req, res) => {
    try {
        const posts = await Post.find({ cityDistrict: req.params.districts }).populate('user');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Post by Accommodation Type
exports.getPostByAccommodationType = async (req, res) => {
    try {
        const posts = await Post.find({ accommodationType: req.params.accommodationType }).populate('user');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search Posts by District and/or Accommodation Type
exports.getPostBySearchHome = async (req, res) => {
    try {
        const { cityDistrict, accommodationType } = req.query;
        const query = {};
        // if (cityDistrict) query.cityDistrict = cityDistrict;
        // if (accommodationType) query.accommodationType = accommodationType;
        // Sanitize and validate inputs
        if (cityDistrict) {
            const sanitizedDistrict = sanitizeString(cityDistrict);
            if (sanitizedDistrict) {
                query.cityDistrict = { $eq: sanitizedDistrict }; 
            }
        }
        
        if (accommodationType) {
            const sanitizedType = sanitizeString(accommodationType);
            if (sanitizedType) {
                query.accommodationType = { $eq: sanitizedType }; 
            }
        }


        const posts = await Post.find(query).populate('user');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Validation helper function
const sanitizeString = (input) => {
    if (typeof input !== 'string') return null;
    // Remove any MongoDB operators and sanitize
    return input.replace(/[\$\\'"\;\{\}]/g, '');
};

// Get Posts by User ID
exports.getPostsByUserId = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).populate('user');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Post by ID
exports.deletePostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};