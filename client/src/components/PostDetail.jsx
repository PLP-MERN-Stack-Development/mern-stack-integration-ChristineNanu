import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../services/api';
import Comments from './Comments';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshPost, setRefreshPost] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, refreshPost]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!post) {
    return (
      <div className="container">
        <button onClick={() => navigate('/')} className="btn btn-secondary" style={{marginBottom: '1rem'}}>
          ← Back to Posts
        </button>
        <div>Post not found</div>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="btn btn-secondary" style={{marginBottom: '1rem'}}>
        ← Back to Posts
      </button>
      
      <article className="post-card">
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>
          {post.title}
        </h1>
        
        <div className="post-meta" style={{marginBottom: '1.5rem'}}>
          <span>By {post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div style={{lineHeight: '1.6', marginBottom: '2rem'}}>
          {post.content}
        </div>
        
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button 
            onClick={() => navigate(`/edit/${post._id}`)}
            className="btn btn-primary"
          >
            Edit Post
          </button>
          <button 
            onClick={handleDelete}
            className="btn"
            style={{backgroundColor: '#dc2626', color: 'white'}}
          >
            Delete Post
          </button>
        </div>
      </article>
      
      <Comments 
        postId={post._id} 
        comments={post.comments} 
        onCommentAdded={() => setRefreshPost(prev => prev + 1)}
      />
    </div>
  );
}

export default PostDetail;