import { useState } from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

interface Meme {
  id: number;
  top: string;
  emoji: string;
  bottom: string;
  lesson: string;
  tag: string;
}

const ALL_MEMES: Meme[] = [
  { id: 1, top: 'When you finally fix the bug', emoji: '🎉', bottom: '...by commenting out the error handler', lesson: 'Suppressing errors ≠ fixing them. Always log before swallowing exceptions.', tag: 'Debugging' },
  { id: 2, top: 'Me adding a comment:', emoji: '💬', bottom: '"// This works. Don\'t touch."', lesson: 'Comments should explain WHY, not WHAT. The code already says what.', tag: 'Clean Code' },
  { id: 3, top: 'The PR is ready for review', emoji: '😈', bottom: '+2,847 lines — 3 files changed', lesson: 'Small PRs merge faster, catch more bugs, and make everyone like you more.', tag: 'PR Review' },
  { id: 4, top: 'It works in dev', emoji: '🔥', bottom: 'Production at 2am:', lesson: '"Works on my machine" is not a deployment strategy. Environment parity saves lives.', tag: 'DevOps' },
  { id: 5, top: 'Senior dev reviewing my code:', emoji: '👀', bottom: '"Why is there a TODO from 2021?"', lesson: 'TODOs without tickets are wishes. If it matters, create a ticket. If it doesn\'t, delete it.', tag: 'Clean Code' },
  { id: 6, top: 'Copilot suggestion:', emoji: '🤖', bottom: 'Me: "Perfect." *pushes to main*', lesson: 'AI code still needs review. Copilot doesn\'t know your business logic. You do.', tag: 'AI Tools' },
  { id: 7, top: 'Writing unit tests:', emoji: '😅', bottom: 'Tests for the tests', lesson: 'Test behavior, not implementation. If you\'re testing private methods, rethink the design.', tag: 'Testing' },
  { id: 8, top: '"I optimized the query"', emoji: '🏎️', bottom: 'Added 3 joins and no index', lesson: 'Always EXPLAIN ANALYZE before and after. Gut feelings fail in databases.', tag: 'Database' },
  { id: 9, top: 'Code review comments:', emoji: '📝', bottom: '"lgtm" (hasn\'t read it)', lesson: 'A rubber stamp review is worse than no review — it creates false security.', tag: 'PR Review' },
  { id: 10, top: 'Tech debt is under control', emoji: '🕳️', bottom: '*git log shows 847 TODO comments*', lesson: 'Tech debt doesn\'t disappear by ignoring it. It compounds. Track it or it owns you.', tag: 'Clean Code' },
  { id: 11, top: 'Our architecture is scalable', emoji: '📦', bottom: '*one env var change breaks everything*', lesson: 'Scalability starts with separation of concerns, not infrastructure size.', tag: 'Architecture' },
  { id: 12, top: 'Me deploying on Friday', emoji: '🤞', bottom: '...see you on Monday', lesson: 'Never deploy on Fridays. Not a myth. A blood-tested rule.', tag: 'DevOps' },
];

const TAGS = ['All', 'Debugging', 'Clean Code', 'PR Review', 'DevOps', 'AI Tools', 'Testing', 'Database', 'Architecture'];

export default function MemeLabPage() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All' ? ALL_MEMES : ALL_MEMES.filter((m) => m.tag === activeTag);

  return (
    <>
      <Navbar />
      <section className="meme-lab-section">
        <div className="section-inner">
          <div className="section-eyebrow">// meme_lab</div>
          <h1 className="section-heading">Humor With a Hidden Lesson</h1>
          <p className="section-sub">Every meme teaches something real. Because the best way to remember a lesson is to laugh first.</p>

          {/* Tag Filter */}
          <div className="page-filters page-filters-mb">
            {TAGS.map((tag) => (
              <button
                key={tag}
                className={`filter-btn${activeTag === tag ? ' active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Meme Grid */}
          <div className="meme-grid">
            {filtered.map((meme) => (
              <div key={meme.id} className="meme-card">
                <div className="meme-top">{meme.top}</div>
                <div className="meme-img-area">{meme.emoji}</div>
                <div className="meme-bottom">{meme.bottom}</div>
                <div className="meme-lesson">{meme.lesson}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

