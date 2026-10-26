export default function Footer({ go, user }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>MERN Blog</strong>
          <p className="muted">Read, write and share stories with the world.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <div className="footer-links">
            <button className="link" onClick={() => go('home')}>Home</button>
            <button className="link" onClick={() => go('about')}>About</button>
            <button className="link" onClick={() => go(user ? 'write' : 'register')}>
              {user ? 'Write' : 'Join'}
            </button>
          </div>
        </div>
        <div>
          <strong>Built with</strong>
          <p className="muted">MongoDB · Express · React · Node.js</p>
        </div>
      </div>
      <p className="copy">© {new Date().getFullYear()} MERN Blog. All rights reserved.</p>
    </footer>
  );
}
