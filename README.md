# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- ✅ RESTful API with Express.js and MongoDB
- ✅ React front-end with component architecture
- ✅ Full CRUD functionality for blog posts
- ✅ Category management
- ✅ Responsive UI with Tailwind CSS
- ✅ MongoDB integration with Mongoose

## API Endpoints

### Posts
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a specific blog post
- `POST /api/posts` - Create a new blog post
- `PUT /api/posts/:id` - Update an existing blog post
- `DELETE /api/posts/:id` - Delete a blog post

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mern-stack-integration
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Set up environment variables
```bash
# In server directory
cp .env.example .env
# Edit .env with your MongoDB connection string

# In client directory
cp .env.example .env
# Edit .env with your API URL if different
```

5. Start the development servers

Server (from server directory):
```bash
npm run dev
```

Client (from client directory):
```bash
npm run dev
```

The server will run on http://localhost:3001 and the client on http://localhost:5173

## Project Structure

```
mern-stack-integration/
├── client/                 # React front-end
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   └── package.json
├── server/                 # Express.js back-end
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React.js, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Development**: Vite, Nodemon

## Screenshots

[Add screenshots of your working application here]