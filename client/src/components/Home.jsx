import { useEffect, useState } from 'react';
import { api, CATEGORIES } from '../api';
import PostCard from './PostCard';
import Reveal from './Reveal';
import InfoTabs from './InfoTabs';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';

function Count({ to }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = Math.max(1, Math.ceil(to / 30));
    const t = setInterval(() => {
      v = Math.min(to, v + step);
      setN(v);
      if (v >= to) clearInterval(t);
    }, 35);
    return () => clearInterval(t);
  }, [to]);
  return n;
}

export default function Home({ user, go }) {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const data = await api(
          `/posts?q=${encodeURIComponent(q)}&category=${encodeURIComponent(cat)}`
        );
        setPosts(data);
        if (q === '' && cat === 'All') setTotal(data.length);
        setError('');
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q, cat]);

  const filtering = q !== '' || cat !== 'All';

  return (
    <>
      {!filtering && (
        <>
          <section className="hero">
            <span className="blob b1" />
            <span className="blob b2" />
            <span className="blob b3" />
            <span className="float-chip c1">✍️ Write</span>
            <span className="float-chip c2">💬 Comment</span>
            <span className="float-chip c3">🔍 Discover</span>

            <div className="hero-content">
              <span className="badge">✨ Themes · Comments · Search</span>
              <h2>
                Stories, ideas and <span className="grad-text">everything in between</span>
              </h2>
              <p>Read what others are writing, or share your own thoughts with the world.</p>
              <div className="hero-actions">
                <button className="btn light" onClick={() => go(user ? 'write' : 'register')}>
                  {user ? 'Write a post' : 'Start writing'}
                </button>
                <button
                  className="btn outline"
                  onClick={() => document.getElementById('posts').scrollIntoView({ behavior: 'smooth' })}
                >
                  Read posts
                </button>
              </div>
            </div>
          </section>

          <Reveal>
            <section className="stats">
              <div className="stat"><strong><Count to={total} /></strong><span>Stories published</span></div>
              <div className="stat"><strong><Count to={CATEGORIES.length} /></strong><span>Categories</span></div>
              <div className="stat"><strong>Free</strong><span>For everyone</span></div>
              <div className="stat"><strong>24/7</strong><span>Always open</span></div>
            </section>
          </Reveal>
        </>
      )}

      <section id="posts">
        <h2 className="section-title">{filtering ? 'Search results' : 'Latest stories'}</h2>
        <div className="toolbar">
          <input
            className="search"
            placeholder="🔍  Search posts..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="tabs scroll">
            {['All', ...CATEGORIES].map((c) => (
              <button key={c} className={`tab ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {loading && !error && <p className="muted">Loading posts...</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="muted empty">No posts found. Try a different search or category.</p>
        )}

        <div className="grid" key={cat + q}>
          {posts.map((p, i) => (
            <div className="pop" style={{ animationDelay: `${i * 70}ms` }} key={p._id}>
              <PostCard post={p} onOpen={(id) => go('post', { id })} />
            </div>
          ))}
        </div>
      </section>

      {!filtering && (
        <>
          <Reveal><InfoTabs /></Reveal>
          <Reveal><Testimonials /></Reveal>
          <Reveal><Newsletter /></Reveal>
        </>
      )}
    </>
  );
}
