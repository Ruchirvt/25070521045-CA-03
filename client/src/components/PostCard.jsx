import { fmtDate, readTime } from '../api';

export default function PostCard({ post, onOpen }) {
  const excerpt = post.body.length > 140 ? post.body.slice(0, 140).trim() + '...' : post.body;
  return (
    <article className="post-card" data-c={post.category} onClick={() => onOpen(post._id)}>
      <span className="tag" data-c={post.category}>{post.category}</span>
      <h3>{post.title}</h3>
      <p className="excerpt">{excerpt}</p>
      <div className="meta">
        <span>
          <span className="avatar">{post.authorName.charAt(0).toUpperCase()}</span>
          {post.authorName}
        </span>
        <span>{fmtDate(post.createdAt)} · {readTime(post.body)} min</span>
      </div>
    </article>
  );
}
