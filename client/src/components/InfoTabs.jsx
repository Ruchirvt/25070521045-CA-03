import { useState } from 'react';

const FEATURES = [
  ['🔐', 'Secure accounts', 'Passwords are hashed and logins use signed tokens.'],
  ['✍️', 'Easy writing', 'Write, edit and delete your posts any time.'],
  ['💬', 'Comments', 'Start conversations under every story.'],
  ['🔍', 'Instant search', 'Find posts by keyword or filter by category.'],
  ['🎨', 'Color themes', 'Five color themes plus light and dark mode.'],
  ['📱', 'Works everywhere', 'Looks great on phones, tablets and desktops.'],
];

const STEPS = [
  ['1', 'Create a free account', 'Sign up with your name, email and a password.'],
  ['2', 'Write your first post', 'Pick a category and share your idea.'],
  ['3', 'Join the conversation', 'Read others, comment and come back for more.'],
];

const FAQ = [
  ['Is it free to use?', 'Yes. Reading and writing are free for everyone.'],
  ['Can I edit or delete my posts?', 'Yes. Open your post and use the Edit or Delete buttons.'],
  ['Where is my data stored?', 'In MongoDB. You can view it live in MongoDB Compass.'],
  ['Do I need an account to read?', 'No. An account is only needed to write and comment.'],
];

export default function InfoTabs() {
  const [tab, setTab] = useState('features');
  const tabs = [['features', 'Features'], ['how', 'How it works'], ['faq', 'FAQ']];

  return (
    <section className="card info">
      <h2 className="section-title">Everything you need to publish</h2>
      <div className="tabs">
        {tabs.map(([id, label]) => (
          <button key={id} className={`tab ${tab === id ? 'on' : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="panel" key={tab}>
        {tab === 'features' && (
          <div className="grid-3">
            {FEATURES.map(([icon, title, text]) => (
              <div className="feature" key={title}>
                <span className="icon">{icon}</span>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'how' && (
          <div className="steps">
            {STEPS.map(([n, title, text]) => (
              <div className="step" key={n}>
                <span className="step-n">{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p className="muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'faq' && (
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p className="muted">{a}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
