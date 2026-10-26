import { useEffect, useState } from 'react';
import { api, fmtDate, readTime } from '../api';

export default function PostDetail({ id, user, token, go, notify }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setPost(await api(`/posts/${id}`));
      setComments(await api(`/comments/post/${id}`));
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await api(`/comments/post/${id}`, { method: 'POST', token, body: { text } });
      setText('');
      setComments(await api(`/comments/post/${id}`));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeComment = async (cid) => {
    try {
      await api(`/comments/${cid}`, { method: 'DELETE', token });
      setComments(await api(`/comments/post/${id}`));
    } catch (err) {
      setError(err.message);
    }
  };

  const removePost = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api(`/posts/${id}`, { method: 'DELETE', token });
      go('home');
      notify('Post deleted.');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error && !post) {
    return (
      <div className="card narrow">
        <p className="error">{error}</p>
        <button className="btn" onClick={() => go('home')}>Back to home</button>
      </div>
    );
  }
  if (!post) return <p className="muted">Loading...</p>;

  const isOwner = user && user.id === post.author;
  const edited = post.updatedAt !== post.createdAt;

  return (
    <>
      <button className="link back" onClick={() => go('home')}>
        ← Back to all posts
      </button>

      <article className="card post">
        <span className="tag">{post.category}</span>
        <h2>{post.title}</h2>
        <p className="meta-line">
          By <strong>{post.authorName}</strong> · {fmtDate(post.createdAt)} ·{' '}
          {readTime(post.body)} min read{edited ? ' · edited' : ''}
        </p>
        <div className="post-body">{post.body}</div>

        {isOwner && (
          <div className="row">
            <button className="btn" onClick={() => go('write', { post })}>Edit</button>
            <button className="btn danger" onClick={removePost}>Delete</button>
          </div>
        )}
      </article>

      <section className="card comments">
        <h3>Comments ({comments.length})</h3>
        {error && <p className="error">{error}</p>}

        {comments.length === 0 && <p className="muted">No comments yet. Be the first!</p>}
        {comments.map((c) => (
          <div className="comment" key={c._id}>
            <div className="comment-head">
              <strong>{c.authorName}</strong>
              <span className="muted small">{fmtDate(c.createdAt)}</span>
              {user && user.id === c.author && (
                <button className="link inline danger-text" onClick={() => removeComment(c._id)}>
                  Delete
                </button>
              )}
            </div>
            <p>{c.text}</p>
          </div>
        ))}

        {user ? (
          <form className="form" onSubmit={addComment}>
            <textarea
              rows="3"
              placeholder="Add a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <div className="row">
              <button className="btn" type="submit">Post comment</button>
            </div>
          </form>
        ) : (
          <p className="muted">
            <button className="link inline" onClick={() => go('login')}>Login</button> to
            join the discussion.
          </p>
        )}
      </section>
    </>
  );
}
