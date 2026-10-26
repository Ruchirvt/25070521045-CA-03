import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <h2>Never miss a story</h2>
      <p>Get the best posts in your inbox. No spam, ever.</p>
      {done ? (
        <p className="thanks">🎉 Thanks for subscribing! (demo form)</p>
      ) : (
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn light" type="submit">Subscribe</button>
        </form>
      )}
    </section>
  );
}
