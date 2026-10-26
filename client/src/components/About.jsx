import { useState } from 'react';

const STACK = [
  ['React', 'Fast, interactive pages in your browser.'],
  ['Node + Express', 'A simple API for logins, posts and comments.'],
  ['MongoDB', 'Stores everything. See it live in Compass.'],
];

export default function About({ go }) {
  const [tab, setTab] = useState('story');
  const [sent, setSent] = useState(false);
  const tabs = [['story', 'Our story'], ['stack', 'Tech stack'], ['contact', 'Contact']];

  return (
    <section className="card about">
      <h2>About MERN Blog</h2>
      <div className="tabs">
        {tabs.map(([id, label]) => (
          <button key={id} className={`tab ${tab === id ? 'on' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="panel" key={tab}>
        {tab === 'story' && (
          <>
            <p>
              MERN Blog is a place to read and share short stories, ideas and tips. Anyone can
              read. Create a free account to write posts, edit them later and join the
              discussion in the comments.
            </p>
            <button className="btn" onClick={() => go('home')}>Read the latest posts</button>
          </>
        )}

        {tab === 'stack' && (
          <div className="grid-3">
            {STACK.map(([title, text]) => (
              <div className="feature" key={title}>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'contact' &&
          (sent ? (
            <p className="thanks-dark">✅ Thanks! Your message was received (demo form).</p>
          ) : (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input placeholder="Your name" required />
              <input type="email" placeholder="Email" required />
              <textarea rows="4" placeholder="Your message" required />
              <div className="row"><button className="btn" type="submit">Send message</button></div>
            </form>
          ))}
      </div>
    </section>
  );
}
