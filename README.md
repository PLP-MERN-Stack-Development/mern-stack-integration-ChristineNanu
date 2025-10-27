# 📝 MERN Stack Blog Application

A full-stack blog application built with **MongoDB**, **Express.js**, **React.js**, and **Node.js** that demonstrates complete MERN stack integration with authentication, CRUD operations, and advanced features.

## 🚀 Features

### ✅ **Core Functionality**
- **User Authentication** - Register, login, logout with JWT tokens
- **Blog Posts Management** - Create, read, update, delete posts
- **Category System** - Organize posts by categories
- **Comments System** - Add and view comments on posts
- **Search & Filter** - Search posts and filter by categories
- **Pagination** - Navigate through posts with page controls
- **Responsive Design** - Works on desktop and mobile devices

### ✅ **Advanced Features**
- **Protected Routes** - Authentication required for creating content
- **Real-time Updates** - Comments update immediately
- **Input Validation** - Server-side validation with express-validator
- **Error Handling** - Comprehensive error management
- **Loading States** - User feedback during API calls

## 🏗️ Architecture

### **Frontend (React.js)**
```
client/
├── src/
│   ├── components/          # React components
│   │   ├── PostList.jsx     # Homepage with paginated posts
│   │   ├── PostDetail.jsx   # Individual post view with comments
│   │   ├── CreatePost.jsx   # Create new post modal
│   │   ├── EditPost.jsx     # Edit existing post
│   │   ├── Comments.jsx     # Comments section
│   │   ├── SearchFilter.jsx # Search and category filters
│   │   ├── Login.jsx        # Login modal
│   │   ├── Register.jsx     # Registration modal
│   │   └── CreateCategory.jsx # Create category modal
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── hooks/
│   │   └── useApi.js        # Custom API hook
│   ├── App.jsx              # Main app with routing
│   ├── App.css              # Custom styles
│   └── main.jsx             # App entry point
```

### **Backend (Express.js + MongoDB)**
```
server/
├── models/                  # Mongoose schemas
│   ├── Post.js             # Post model with category reference
│   ├── Category.js         # Category model
│   └── User.js             # User model with password hashing
├── routes/                 # API endpoints
│   ├── posts.js           # CRUD operations for posts
│   ├── categories.js      # Category management
│   └── auth.js            # Authentication routes
├── server.js              # Express server setup
├── seed.js                # Sample data generator
└── .env                   # Environment variables
```

## 🔄 Data Flow

### **Authentication Flow**
1. User registers/logs in → JWT token generated
2. Token stored in localStorage
3. Token sent with API requests
4. Server validates token for protected routes

### **Post Management Flow**
1. **Create**: User creates post → Validated → Saved to MongoDB
2. **Read**: Posts fetched with category population → Displayed with pagination
3. **Update**: Post edited → Validated → Updated in database
4. **Delete**: Post removed → UI updated

### **Comments Flow**
1. User adds comment → Validated → Added to post's comments array
2. Comments displayed immediately → Real-time user experience

## 🛠️ Technology Stack

### **Frontend**
- **React.js 19** - UI library with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Build tool and dev server
- **Custom CSS** - Responsive styling

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📡 API Documentation

### **Authentication Endpoints**
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login user
```

### **Posts Endpoints**
```
GET    /api/posts          # Get all posts (with pagination)
GET    /api/posts/:id      # Get specific post with comments
POST   /api/posts          # Create new post (protected)
PUT    /api/posts/:id      # Update post (protected)
DELETE /api/posts/:id      # Delete post (protected)
POST   /api/posts/:id/comments # Add comment to post
```

### **Categories Endpoints**
```
GET  /api/categories       # Get all categories
POST /api/categories       # Create new category (protected)
```

## 🗄️ Database Schema

### **Post Model**
```javascript
{
  title: String (required),
  content: String (required),
  author: String (default: 'Anonymous'),
  category: ObjectId (ref: 'Category'),
  comments: [{
    author: String (required),
    content: String (required),
    createdAt: Date
  }],
  createdAt: Date
}
```

### **Category Model**
```javascript
{
  name: String (required, unique),
  description: String
}
```

### **User Model**
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  createdAt: Date
}
```

## 🚀 Setup Instructions

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas)
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd mern-stack-integration
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables**

Create `.env` in server directory:
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-secret-key-here
```

Create `.env` in client directory (optional):
```env
VITE_API_URL=http://localhost:3001/api
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Seed sample data (optional)**
```bash
cd server
node seed.js
```

7. **Start development servers**

Terminal 1 (Server):
```bash
cd server
npm run dev
```

Terminal 2 (Client):
```bash
cd client
npm run dev
```

8. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🎯 How to Use

### **Getting Started**
1. **Register** a new account or **Login** with existing credentials
2. **Browse posts** on the homepage with pagination
3. **Search posts** using the search bar
4. **Filter by category** using category buttons

### **Creating Content**
1. **Create Post**: Click "New Post" button (requires login)
2. **Create Category**: Click "New Category" button (requires login)
3. **Add Comments**: Click on any post title to view details and add comments

### **Managing Posts**
1. **View Post**: Click on any post title from the homepage to view full content and comments
2. **Edit Post**: 
   - Click on post title → Navigate to post detail page
   - Click "Edit Post" button → Opens edit form
   - Make changes and save
3. **Delete Post**: 
   - Click on post title → Navigate to post detail page
   - Click "Delete Post" button → Confirmation dialog appears
   - Confirm deletion → Post removed and redirected to homepage
4. **Add Comments**: On post detail page, scroll down to comment section and submit new comments

## 🔧 Development Features

### **State Management**
- React hooks (useState, useEffect) for local state
- Custom useApi hook for API calls
- Context-free architecture with prop drilling

### **Error Handling**
- Try-catch blocks in all async operations
- User-friendly error messages
- Loading states for better UX

### **Validation**
- Server-side validation with express-validator
- Client-side form validation
- Real-time feedback on form errors

### **Security**
- JWT token authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- Input sanitization

## 📱 User Interface

### **Homepage**
- Clean, modern design with card-based layout
- Pagination controls (3 posts per page)
- Search bar and category filter buttons
- Responsive navigation bar

### **Authentication**
- Modal-based login/register forms
- Form validation with error messages
- Automatic redirect after successful auth

### **Post Management**
- **Navigation**: Click post titles to view individual posts
- **Edit/Delete**: Available on post detail pages with confirmation dialogs
- **Rich Forms**: Post creation/editing with validation
- **Comment System**: Real-time comment updates
- **Intuitive Flow**: Homepage → Post Detail → Edit/Delete actions

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] User registration and login
- [ ] Create new posts via "New Post" button
- [ ] Click post titles to navigate to detail view
- [ ] Edit posts from detail page
- [ ] Delete posts with confirmation dialog
- [ ] Add comments to posts
- [ ] Search and filter functionality
- [ ] Pagination navigation (3 posts per page)
- [ ] Category filtering with clickable buttons
- [ ] Responsive design on mobile
- [ ] Error handling scenarios

### **API Testing**
```bash
# Test registration
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

# Test post creation
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Post","content":"Test content","author":"Test User"}'
```

## 🚀 Deployment

### **Production Build**
```bash
# Build client
cd client
npm run build

# Start production server
cd ../server
NODE_ENV=production npm start
```

### **Environment Variables for Production**
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog
JWT_SECRET=your-production-secret-key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.



**🎉 This application successfully demonstrates a complete MERN stack integration with authentication, CRUD operations, real-time features, and modern web development practices!**