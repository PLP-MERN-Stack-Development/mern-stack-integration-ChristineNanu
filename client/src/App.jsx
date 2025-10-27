import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';
import CreatePost from './components/CreatePost';
import CreateCategory from './components/CreateCategory';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(0);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handlePostCreated = () => {
    setShowCreatePost(false);
    setRefreshPosts(prev => prev + 1);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <nav className="nav">
          <div className="nav-content">
            <h1>📝 MERN Blog</h1>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {user ? (
                <>
                  <span style={{ marginRight: '1rem' }}>Welcome, {user.username}!</span>
                  <button 
                    onClick={() => setShowCreatePost(true)}
                    className="btn btn-primary"
                  >
                    New Post
                  </button>
                  <button 
                    onClick={() => setShowCreateCategory(true)}
                    className="btn btn-secondary"
                  >
                    New Category
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-secondary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setShowAuth('login')}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setShowAuth('register')}
                    className="btn btn-secondary"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={
              user ? <PostList key={refreshPosts} /> : 
              <div className="container" style={{textAlign: 'center', padding: '4rem'}}>
                <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Welcome to MERN Blog</h2>
                <p style={{marginBottom: '2rem', color: '#6b7280'}}>Please login or register to view posts</p>
              </div>
            } />
            <Route path="/posts/:id" element={user ? <PostDetail /> : <div>Please login to view posts</div>} />
            <Route path="/edit/:id" element={user ? <EditPost /> : <div>Please login to edit posts</div>} />
          </Routes>
        </main>
        {showCreatePost && user && (
          <CreatePost 
            onPostCreated={handlePostCreated}
            onCancel={() => setShowCreatePost(false)}
          />
        )}
        
        {showCreateCategory && user && (
          <CreateCategory 
            onCategoryCreated={() => {
              setShowCreateCategory(false);
              setRefreshPosts(prev => prev + 1);
            }}
            onCancel={() => setShowCreateCategory(false)}
          />
        )}
        
        {showAuth === 'login' && (
          <Login 
            onLogin={handleLogin}
            onSwitchToRegister={() => setShowAuth('register')}
          />
        )}
        
        {showAuth === 'register' && (
          <Register 
            onLogin={handleLogin}
            onSwitchToLogin={() => setShowAuth('login')}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
