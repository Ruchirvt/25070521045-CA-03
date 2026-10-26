const API = 'http://localhost:5000/api';

export const CATEGORIES = ['Technology', 'Lifestyle', 'Travel', 'Education', 'Other'];

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

export const readTime = (text) =>
  Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));

export async function api(path, { method = 'GET', body, token } = {}) {
  let res;
  try {
    res = await fetch(API + path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Cannot reach the server. Make sure the backend is running on port 5000.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}
