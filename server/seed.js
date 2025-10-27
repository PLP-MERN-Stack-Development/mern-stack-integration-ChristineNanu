const mongoose = require('mongoose');
const Post = require('./models/Post');
const Category = require('./models/Category');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await Post.deleteMany({});
    await Category.deleteMany({});
    
    // Create categories
    const tech = await Category.create({ name: 'Technology', description: 'Tech posts' });
    const lifestyle = await Category.create({ name: 'Lifestyle', description: 'Lifestyle posts' });
    
    // Create posts
    await Post.create([
      {
        title: 'Getting Started with MERN Stack',
        content: 'Learn how to build full-stack applications with MongoDB, Express, React, and Node.js...',
        category: tech._id,
        author: 'John Doe'
      },
      {
        title: 'React Hooks Best Practices',
        content: 'Discover the best practices for using React hooks in your applications...',
        category: tech._id,
        author: 'Jane Smith'
      },
      {
        title: 'Work-Life Balance Tips',
        content: 'Tips for maintaining a healthy work-life balance in the tech industry...',
        category: lifestyle._id,
        author: 'Mike Johnson'
      }
    ]);
    
    console.log('Sample data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();