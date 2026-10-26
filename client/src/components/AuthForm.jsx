import { useState } from 'react';
import { api } from '../api';

export default function AuthForm({ mode, onAuth, go }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const isLogin = mode === 'login';

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };
      const data = await api(`/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        body,
      });
      onAuth(data);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form className="card form narrow" onSubmit={submit}>
      <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
      {error && <p className="error">{error}</p>}
      {!isLogin && (
        <input placeholder="Your name" value={form.name} onChange={set('name')} required />
      )}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={set('email')}
        required
      />
      <input
        type="password"
        placeholder="Password (min 6 characters)"
        value={form.password}
        onChange={set('password')}
        required
      />
      <button className="btn" type="submit" disabled={busy}>
        {busy ? 'Please wait...' : isLogin ? 'Login' : 'Sign up'}
      </button>
      {isLogin && <p className="muted small">Demo account: demo@blog.com / demo123</p>}
      <p className="muted small">
        {isLogin ? 'New here? ' : 'Already have an account? '}
        <button
          type="button"
          className="link inline"
          onClick={() => go(isLogin ? 'register' : 'login')}
        >
          {isLogin ? 'Create an account' : 'Login'}
        </button>
      </p>
    </form>
  );
}
