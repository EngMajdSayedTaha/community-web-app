import { useState, FormEvent } from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

interface Challenge {
  id: number;
  week: string;
  diffClass: string;
  diffLabel: string;
  title: string;
  desc: string;
  tags: string[];
  submissions: string;
  status: 'live' | 'closed';
  winner?: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 17,
    week: '🔴 Live Now · Week #17',
    diffClass: 'diff-mid',
    diffLabel: 'Intermediate',
    title: 'Fix the Memory Leak in This Angular Service',
    desc: "This service is running in a real app and it's slowly eating memory. Find the issue, explain why it happens, and show the correct fix with explanation.",
    tags: ['Angular', 'RxJS', 'Memory', 'Subscriptions'],
    submissions: '47 · Closes in 3 days',
    status: 'live',
  },
  {
    id: 16,
    week: 'Week #16',
    diffClass: 'diff-hard',
    diffLabel: 'Hard',
    title: 'Debug the SQL Server Deadlock',
    desc: 'Two stored procs are hitting each other in prod. 3 queries, one deadlock. Find it and fix it.',
    tags: ['SQL Server', 'Deadlock', '.NET'],
    submissions: '89 submissions',
    status: 'closed',
    winner: '@devhossam_',
  },
  {
    id: 15,
    week: 'Week #15',
    diffClass: 'diff-easy',
    diffLabel: 'Beginner',
    title: 'TypeScript: Narrow This Type Without Casting',
    desc: "You have an `unknown` type coming from an API. Make it type-safe without a single `as` cast.",
    tags: ['TypeScript', 'Type Guards'],
    submissions: '134 submissions',
    status: 'closed',
    winner: '@ts_wizard',
  },
  {
    id: 14,
    week: 'Week #14',
    diffClass: 'diff-mid',
    diffLabel: 'Intermediate',
    title: 'Optimize This LINQ Query',
    desc: 'This query works but runs in 3 seconds on 50K rows. Identify the N+1 problem and fix it.',
    tags: ['.NET', 'LINQ', 'EF Core', 'Performance'],
    submissions: '67 submissions',
    status: 'closed',
    winner: '@dotnet_ninja',
  },
  {
    id: 13,
    week: 'Week #13',
    diffClass: 'diff-hard',
    diffLabel: 'Hard',
    title: 'Git: Recover the Lost Commit',
    desc: 'A hard reset wiped 3 commits. Recover the work using git internals.',
    tags: ['Git', 'Reflog', 'Recovery'],
    submissions: '43 submissions',
    status: 'closed',
    winner: '@gitmaster99',
  },
];

export default function ChallengesPage() {
  const [showForm, setShowForm] = useState(false);
  const [solution, setSolution] = useState('');
  const [handle, setHandle] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const liveChallenge = CHALLENGES.find((c) => c.status === 'live');
  const pastChallenges = CHALLENGES.filter((c) => c.status === 'closed');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!solution.trim() || !handle.trim()) {
      setSubmitStatus('error');
      return;
    }
    // TODO: wire to real submission API
    setSubmitStatus('success');
    setShowForm(false);
    setSolution('');
    setHandle('');
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <>
      <Navbar />
      <section className="challenge-section page-section">
        <div className="section-inner">
          <div className="section-eyebrow">// weekly_challenges</div>
          <h1 className="section-heading">Put Your Skills to the Test</h1>
          <p className="section-sub">
            Real-world problems from actual production code. Every week. Majd reacts to the best solutions on video.
          </p>

          {submitStatus === 'success' && (
            <p className="cta-status success success-banner">
              ✓ Solution submitted! Majd will review it this week.
            </p>
          )}

          {/* Live Challenge */}
          {liveChallenge && (
            <div className="ch-card featured challenge-live-gap">
              <div className="ch-header">
                <span className="ch-week">{liveChallenge.week}</span>
                <span className={`ch-difficulty ${liveChallenge.diffClass}`}>{liveChallenge.diffLabel}</span>
              </div>
              <div className="ch-body">
                <div className="ch-title">{liveChallenge.title}</div>
                <p className="ch-desc">{liveChallenge.desc}</p>
                <div className="ch-tags">
                  {liveChallenge.tags.map((t) => <span key={t} className="ch-tag">{t}</span>)}
                </div>
              </div>
              <div className="ch-footer">
                <span className="ch-submissions">Submissions: <span>{liveChallenge.submissions}</span></span>
                <button className="ch-btn ch-btn-primary" onClick={() => setShowForm(!showForm)}>
                  {showForm ? 'Cancel' : 'Submit Solution →'}
                </button>
              </div>
            </div>
          )}

          {/* Submission Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="submit-form" noValidate>
              <div className="section-eyebrow section-eyebrow-sm">// submit_your_solution</div>
              <input
                className="cta-input"
                type="text"
                placeholder="@your_handle (TikTok / Instagram)"
                value={handle}
                onChange={(e) => { setHandle(e.target.value); setSubmitStatus('idle'); }}
                aria-label="Your handle"
              />
              <textarea
                className="submit-textarea"
                placeholder="Paste your solution or explain your approach..."
                value={solution}
                onChange={(e) => { setSolution(e.target.value); setSubmitStatus('idle'); }}
                rows={8}
                aria-label="Your solution"
              />
              <div className="submit-footer-row">
                {submitStatus === 'error' && <span className="cta-status error">✗ Fill in all fields.</span>}
                <div className="submit-right">
                  <button type="submit" className="ch-btn ch-btn-primary">Submit →</button>
                </div>
              </div>
            </form>
          )}

          {/* Past Challenges */}
          <div>
            <div className="section-eyebrow past-challenges-header">// past_challenges</div>
            <div className="challenge-board">
              {pastChallenges.map((ch) => (
                <div key={ch.id} className="ch-card">
                  <div className="ch-header">
                    <span className="ch-week">{ch.week}</span>
                    <span className={`ch-difficulty ${ch.diffClass}`}>{ch.diffLabel}</span>
                  </div>
                  <div className="ch-body">
                    <div className="ch-title">{ch.title}</div>
                    <p className="ch-desc">{ch.desc}</p>
                    <div className="ch-tags">
                      {ch.tags.map((t) => <span key={t} className="ch-tag">{t}</span>)}
                    </div>
                  </div>
                  <div className="ch-footer">
                    {ch.winner
                      ? <span className="ch-submissions">Winner: <span>{ch.winner}</span></span>
                      : <span className="ch-submissions">{ch.submissions}</span>
                    }
                    <button className="ch-btn ch-btn-ghost">See Solution</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

