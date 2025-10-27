import { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import SearchFilter from './SearchFilter';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div>Loading posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ 
          backgroundColor: '#fee2e2', 
          border: '1px solid #fca5a5', 
          color: '#b91c1c', 
          padding: '1rem', 
          borderRadius: '0.5rem' 
        }}>
          Error: {error}
        </div>
      </div>
    );
  }

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handleFilter = (category) => {
    if (!category) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => {
        // Check if post has category field and matches
        if (post.category && typeof post.category === 'object' && post.category.name) {
          return post.category.name.toLowerCase() === category.toLowerCase();
        }
        // For sample data without category objects, check author or content
        return post.author && post.author.toLowerCase().includes(category.toLowerCase());
      });
      setFilteredPosts(filtered);
    }
    setCurrentPage(1);
  };

  const getCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (posts.length === 0) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '0.5rem' }}>No posts yet</h2>
          <p style={{ color: '#9ca3af' }}>Create your first blog post!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
        Blog Posts
      </h1>
      
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      
      <div>
        {getCurrentPosts().map((post) => (
          <div key={post._id} className="post-card">
            <h2 className="post-title">
              <button 
                onClick={() => window.location.href = `/posts/${post._id}`}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  color: 'inherit',
                  padding: 0
                }}
              >
                {post.title}
              </button>
            </h2>
            <p className="post-content">
              {post.content.substring(0, 150)}...
            </p>
            <div className="post-meta">
              <span>By {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-secondary"
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span style={{ padding: '0.5rem 1rem', alignSelf: 'center' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn btn-secondary"
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;