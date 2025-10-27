const mongoose = require('mongoose');
const Post = require('./models/Post');
require('dotenv').config();

const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const posts = await Post.find();
    console.log('Posts in database:', posts.length);
    console.log('Posts:', posts);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testDB();