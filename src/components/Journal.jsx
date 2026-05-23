import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Journal({
  JOURNAL_ENTRIES
}) {
  return (
    <section id="journal" className="journal">
      <div className="container">
        <div className="journal-header">
          <div className="hero-subtitle-wrap" style={{ justifyContent: 'center' }}>
            <div className="hero-subtitle-line"></div>
            <span className="hero-subtitle">The Rawasi Journal</span>
            <div className="hero-subtitle-line"></div>
          </div>
          <h2>Chronicles of Olfaction</h2>
        </div>

        <div className="journal-grid">
          {JOURNAL_ENTRIES.map((entry) => (
            <div key={entry.id} className="journal-card">
              <div className="journal-img-wrap">
                <img src={entry.image} alt={entry.title} />
              </div>
              <div className="journal-content">
                <div className="journal-meta">
                  <span>{entry.category}</span>
                  <span>{entry.date}</span>
                </div>
                <h3 className="journal-title">{entry.title}</h3>
                <p className="journal-excerpt">{entry.excerpt}</p>
                <button className="read-more" onClick={() => alert(`Reading "${entry.title}" ... feature coming soon!`)}>
                  Read Article <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
