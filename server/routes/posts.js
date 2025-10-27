const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/posts called');
    const posts = await Post.find();
    console.log('Found posts:', posts.length);
    if (posts.length === 0) {
      // Return sample data if database is empty
      return res.json([
        {
          _id: '1',
          title: 'Sample Post 1',
          content: 'This is a sample blog post to test the frontend...',
          author: 'Test Author',
          createdAt: new Date()
        },
        {
          _id: '2', 
          title: 'Sample Post 2',
          content: 'Another sample post to demonstrate the blog functionality...',
          author: 'Demo User',
          createdAt: new Date()
        }
      ]);
    }
    res.json(posts);
  } catch (error) {
    console.error('Error in GET /posts:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create post
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment to post
router.post('/:id/comments', [
  body('author').notEmpty().withMessage('Author is required'),
  body('content').notEmpty().withMessage('Comment content is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.comments.push(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
