import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import AuthForm from './components/AuthForm';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  const [page, setPage] = useState({ name: 'home' });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [flash, setFlash] = useState('');

  const go = (name, extra = {}) => {
    setFlash('');
    setPage({ name, ...extra });
    window.scrollTo(0, 0);
  };

  const notify = (message) => {
    setFlash(message);
    setTimeout(() => setFlash(''), 3000);
  };

  const onAuth = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    go('home');
    notify(`Welcome, ${data.user.name}!`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    go('home');
    notify('You have been logged out.');
  };

  const showFab = !['write', 'login', 'register'].includes(page.name);

  return (
    <div className="app">
      <Navbar user={user} page={page.name} go={go} logout={logout} />
      {flash && <div className="flash">{flash}</div>}

      <main className="container" key={page.name + (page.id || '')}>
        {page.name === 'home' && <Home user={user} go={go} />}
        {page.name === 'post' && (
          <PostDetail id={page.id} user={user} token={token} go={go} notify={notify} />
        )}
        {page.name === 'write' && (
          <PostForm token={token} post={page.post} go={go} notify={notify} />
        )}
        {(page.name === 'login' || page.name === 'register') && (
          <AuthForm mode={page.name} onAuth={onAuth} go={go} />
        )}
        {page.name === 'about' && <About go={go} />}
      </main>

      <Footer go={go} user={user} />

      {showFab && (
        <button className="fab" onClick={() => go(user ? 'write' : 'register')}>
          {user ? '✍️ Write' : '🚀 Join free'}
        </button>
      )}
    </div>
  );
}
