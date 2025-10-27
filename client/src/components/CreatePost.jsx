import { useState } from 'react';
import { createPost } from '../services/api';

function CreatePost({ onPostCreated, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost(formData);
      onPostCreated();
      setFormData({ title: '', content: '', author: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Create New Post
        </h2>
        <form onSubmit={handleSubmit}>
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
          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ opacity: loading ? 0.5 : 1 }}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;