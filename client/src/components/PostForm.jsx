import { useState } from 'react';
import { api, CATEGORIES } from '../api';

export default function PostForm({ token, post, go, notify }) {
  const editing = Boolean(post);
  const [title, setTitle] = useState(post ? post.title : '');
  const [body, setBody] = useState(post ? post.body : '');
  const [category, setCategory] = useState(post ? post.category : CATEGORIES[0]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!token) {
    return (
      <div className="card narrow">
        <p>Please log in to write a post.</p>
        <button className="btn" onClick={() => go('login')}>Login</button>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const payload = { title, body, category };
      const saved = editing
        ? await api(`/posts/${post._id}`, { method: 'PUT', token, body: payload })
        : await api('/posts', { method: 'POST', token, body: payload });
      go('post', { id: saved._id });
      notify(editing ? 'Post updated.' : 'Post published!');
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h2>{editing ? 'Edit post' : 'Write a new post'}</h2>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <textarea
        rows="12"
        placeholder="Write your story... (leave a blank line between paragraphs)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <div className="row">
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Saving...' : editing ? 'Save changes' : 'Publish'}
        </button>
        <button
          type="button"
          className="btn ghost"
          onClick={() => (editing ? go('post', { id: post._id }) : go('home'))}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
