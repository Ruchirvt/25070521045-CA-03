import { useState } from 'react';

const THEMES = [
  ['indigo', '#6366f1'],
  ['ocean', '#0ea5e9'],
  ['sunset', '#f97316'],
  ['forest', '#10b981'],
  ['rose', '#ec4899'],
];

function ThemePicker() {
  const root = document.documentElement;
  const [theme, setTheme] = useState(root.dataset.theme);
  const [mode, setMode] = useState(root.dataset.mode);

  const pick = (t) => {
    root.dataset.theme = t;
    localStorage.setItem('theme', t);
    setTheme(t);
  };
  const toggle = () => {
    const m = mode === 'dark' ? 'light' : 'dark';
    root.dataset.mode = m;
    localStorage.setItem('mode', m);
    setMode(m);
  };

  return (
    <div className="theme-picker" title="Change colors">
      {THEMES.map(([name, color]) => (
        <button
          key={name}
          aria-label={`${name} theme`}
          className={`dot ${theme === name ? 'on' : ''}`}
          style={{ background: color }}
          onClick={() => pick(name)}
        />
      ))}
      <button className="mode" onClick={toggle} aria-label="Toggle dark mode">
        {mode === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default function Navbar({ user, page, go, logout }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <h1 className="logo" onClick={() => go('home')}>
          <span className="logo-mark">M</span> MERN Blog
        </h1>
        <nav className="nav-links">
          <button className={`link ${page === 'home' ? 'active' : ''}`} onClick={() => go('home')}>
            Home
          </button>
          <button className={`link ${page === 'about' ? 'active' : ''}`} onClick={() => go('about')}>
            About
          </button>
          <ThemePicker />
          {user ? (
            <>
              <button className="btn" onClick={() => go('write')}>+ Write</button>
              <span className="hello">Hi, {user.name}</span>
              <button className="btn ghost" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn ghost" onClick={() => go('login')}>Login</button>
              <button className="btn" onClick={() => go('register')}>Sign up</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
