const ITEMS = [
  ['Asha', 'Student', 'Clean and fast. I published my first post in two minutes.'],
  ['Daniel', 'Developer', 'Love the themes and dark mode. Perfect for my notes.'],
  ['Meera', 'Traveler', 'The comments make it feel like a real community.'],
];

export default function Testimonials() {
  return (
    <section>
      <h2 className="section-title">What readers say</h2>
      <div className="grid">
        {ITEMS.map(([name, role, text]) => (
          <div className="quote" key={name}>
            <p>“{text}”</p>
            <div className="who">
              <span className="avatar big">{name.charAt(0)}</span>
              <div>
                <strong>{name}</strong>
                <div className="muted small">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="muted small center">Sample feedback shown for demonstration.</p>
    </section>
  );
}
