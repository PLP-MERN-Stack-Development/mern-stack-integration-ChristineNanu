import { useState } from 'react';
import { addComment } from '../services/api';

function Comments({ postId, comments, onCommentAdded }) {
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addComment(postId, newComment);
      setNewComment({ author: '', content: '' });
      onCommentAdded();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Comments ({comments?.length || 0})
      </h3>
      
      <div style={{ marginBottom: '2rem' }}>
        {comments?.map((comment, index) => (
          <div key={index} style={{ 
            backgroundColor: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            marginBottom: '1rem' 
          }}>
            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              {comment.author}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              {comment.content}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
          Add a Comment
        </h4>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your name"
            value={newComment.author}
            onChange={(e) => setNewComment({...newComment, author: e.target.value})}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Your comment"
            value={newComment.content}
            onChange={(e) => setNewComment({...newComment, content: e.target.value})}
            className="form-textarea"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
}

export default Comments;