import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost } from '../services/api';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(id);
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePost(id, formData);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>
        Edit Post
      </h1>
      
      <form onSubmit={handleSubmit} style={{maxWidth: '600px'}}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Post title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <textarea
            placeholder="Post content"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="form-textarea"
            style={{minHeight: '200px'}}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Author name"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            className="form-input"
            required
          />
        </div>
        
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{opacity: loading ? 0.5 : 1}}
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;