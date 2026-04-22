import { useState } from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

type TagKey = 'all' | 'angular' | 'ts' | 'dotnet' | 'copilot' | 'sql' | 'git';

interface DevCard {
  id: number;
  icon: string;
  tagClass: string;
  tagKey: TagKey;
  tagLabel: string;
  title: string;
  desc: string;
  meme: string;
  snippets: string[];
  saves: string;
}

const ALL_CARDS: DevCard[] = [
  { id: 1, icon: '⚡', tagClass: 'tag-angular', tagKey: 'angular', tagLabel: 'Angular', title: 'The 3 Ways to Unsubscribe (and Which One to Use)', desc: "Every Angular dev leaks memory at some point. Here's the complete map of unsubscription patterns with when to use each.", meme: '"My app works perfectly." — You, before you opened Task Manager', snippets: ['takeUntilDestroyed() // ← best for Angular 16+', 'async pipe // ← template auto-unsubscribe', 'ngOnDestroy + Subject // ← classic pattern'], saves: '★ 834 saves' },
  { id: 2, icon: '🔷', tagClass: 'tag-ts', tagKey: 'ts', tagLabel: 'TypeScript', title: 'Stop Using `any`. Use These Instead.', desc: 'The 5 TypeScript patterns that replace `any` without making you want to quit your job.', meme: '"I\'ll fix the types later." — Your commit from 8 months ago, still in prod', snippets: ['unknown // safer any — forces type check', 'Record<string, unknown> // typed object map', 'satisfies // TS 4.9 — infer + validate'], saves: '★ 1.2K saves' },
  { id: 3, icon: '🟣', tagClass: 'tag-dotnet', tagKey: 'dotnet', tagLabel: '.NET / C#', title: 'async/await Mistakes That Bite You in Prod', desc: 'The 4 async patterns that look fine in dev, silently destroy performance in production.', meme: '"It works on my machine." — Famous last words before the .Result deadlock', snippets: ['❌ .Result / .Wait() // deadlock waiting room', '✓ await Task.WhenAll() // parallel done right', '✓ ConfigureAwait(false) // no context capture'], saves: '★ 976 saves' },
  { id: 4, icon: '🤖', tagClass: 'tag-copilot', tagKey: 'copilot', tagLabel: 'Copilot', title: 'GitHub Copilot Prompts That Actually Work', desc: "Stop getting garbage suggestions. These prompt patterns get Copilot to generate code you'd actually commit.", meme: '"AI will replace devs." — Someone who hasn\'t tried to get it to write a stored proc', snippets: ['// Given: [context]. Do: [task]. Avoid: [pitfalls]', '@workspace /explain this error in simple terms', '#file:service.ts write a unit test for getData()'], saves: '★ 2.1K saves' },
  { id: 5, icon: '🗄️', tagClass: 'tag-sql', tagKey: 'sql', tagLabel: 'SQL Server', title: 'Stored Proc Debugging Cheat Sheet', desc: 'The 6 things to check first when your stored proc works in SSMS but breaks in production.', meme: '"The parameter name is literally right there." — You, 2 hours into debugging a typo', snippets: ['1. Check @param name matches C# exactly', '2. SET NOCOUNT ON — suppress row counts', "3. NULL vs '' — they're different"], saves: '★ 743 saves' },
  { id: 6, icon: '🌿', tagClass: 'tag-git', tagKey: 'git', tagLabel: 'Git', title: 'Git Commands You Use Twice a Year and Always Forget', desc: "The commands you Google every single time. Now you don't have to.", meme: '"I\'ll just copy-paste from Stack Overflow." — You, for the 47th time this month', snippets: ['git stash pop // bring back stashed changes', 'git commit --amend --no-edit // fix last commit', 'git log --oneline --graph // visual branch tree'], saves: '★ 1.8K saves' },
  { id: 7, icon: '⚡', tagClass: 'tag-angular', tagKey: 'angular', tagLabel: 'Angular', title: 'Angular Signals: The Mental Model', desc: 'Signals are not just "reactive variables". Understanding the execution model prevents 90% of the bugs.', meme: '"Just wrap it in a signal." — Junior dev, confidently', snippets: ['signal() vs computed() vs effect()', 'effect() runs once on init — always', 'toSignal() bridges RxJS to Signals'], saves: '★ 621 saves' },
  { id: 8, icon: '🔷', tagClass: 'tag-ts', tagKey: 'ts', tagLabel: 'TypeScript', title: 'Mapped Types: Build Your Own Utility Types', desc: "TypeScript's built-in utility types are great, but knowing how to build yours unlocks the real power.", meme: '"I just cast it as any." — Developer who wrote 800 lines of type gymnastics yesterday', snippets: ['type Optional<T> = { [K in keyof T]?: T[K] }', 'type ReadOnly<T> = { readonly [K in keyof T]: T[K] }', 'type NonNull<T> = T extends null ? never : T'], saves: '★ 889 saves' },
  { id: 9, icon: '🟣', tagClass: 'tag-dotnet', tagKey: 'dotnet', tagLabel: '.NET / C#', title: 'Dependency Injection Lifetimes Explained', desc: 'Singleton vs Scoped vs Transient — and the memory leak that happens when you get it wrong.', meme: '"It worked in Singleton, why is it breaking now?" — Scoped service used inside Singleton', snippets: ['Singleton: one instance — session state trap', 'Scoped: per HTTP request — safe for DbContext', 'Transient: new every time — no shared state'], saves: '★ 1.1K saves' },
  { id: 10, icon: '🗄️', tagClass: 'tag-sql', tagKey: 'sql', tagLabel: 'SQL Server', title: 'Index Strategy: When and What to Index', desc: "Indexes speed up reads but slow down writes. Here's the decision framework senior DBAs use.", meme: '"Just add an index to everything." — Someone who has never maintained a table with 200 indexes', snippets: ['Covering index = no lookup needed', 'Composite: most selective column first', 'Include columns to avoid key lookup'], saves: '★ 567 saves' },
  { id: 11, icon: '🌿', tagClass: 'tag-git', tagKey: 'git', tagLabel: 'Git', title: 'Git Rebase vs Merge: The Real Difference', desc: 'It is not just about clean history. Understanding the internals helps you choose correctly every time.', meme: '"Just use rebase everywhere." — Devs who have never hit a conflict in a shared branch', snippets: ['merge: preserves history, safe on shared branches', 'rebase: linear history, dangerous on shared', 'squash merge: clean main, loses detailed history'], saves: '★ 1.4K saves' },
  { id: 12, icon: '🤖', tagClass: 'tag-copilot', tagKey: 'copilot', tagLabel: 'Copilot', title: 'Copilot for Code Review: Prompt Patterns', desc: 'Use Copilot not just to write code but to review it. These prompts catch real bugs.', meme: '"Copilot said it looks fine." — Famous last words before the security audit', snippets: ['"Review this for SQL injection vulnerabilities"', '"What edge cases does this function miss?"', '"Suggest a more performant approach for this loop"'], saves: '★ 934 saves' },
];

const FILTERS: { key: TagKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'angular', label: 'Angular' },
  { key: 'ts', label: 'TypeScript' },
  { key: 'dotnet', label: '.NET' },
  { key: 'copilot', label: 'Copilot' },
  { key: 'sql', label: 'SQL' },
  { key: 'git', label: 'Git' },
];

export default function DevCardsPage() {
  const [activeFilter, setActiveFilter] = useState<TagKey>('all');
  const [search, setSearch] = useState('');

  const filtered = ALL_CARDS.filter((c) => {
    const matchesFilter = activeFilter === 'all' || c.tagKey === activeFilter;
    const matchesSearch = search === '' || c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleShare = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${title} — majdst.codes`).then(() => alert('Copied!')).catch(() => {});
    }
  };

  return (
    <>
      <Navbar />
      <section className="cards-section page-section">
        <div className="section-inner">
          <div className="section-eyebrow">// dev_cards</div>
          <h1 className="section-heading">Knowledge You'll Actually Use</h1>
          <p className="section-sub">Cheat sheets, patterns, and gotchas from real production experience.</p>

          {/* Search + Filter */}
          <div className="page-controls">
            <input
              className="page-search"
              type="search"
              placeholder="Search cards..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search dev cards"
            />
            <div className="page-filters">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`filter-btn${activeFilter === f.key ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="cards-grid">
            {filtered.map((card) => (
              <div className="dev-card" key={card.id}>
                <div className="dev-card-top">
                  <div className="dev-card-icon">{card.icon}</div>
                  <span className={`dev-card-tag ${card.tagClass}`}>{card.tagLabel}</span>
                </div>
                <div className="dev-card-body">
                  <div className="dev-card-title">{card.title}</div>
                  <div className="dev-card-desc">{card.desc}</div>
                  <div className="dev-card-meme">{card.meme}</div>
                  <div className="dev-card-snippets">
                    {card.snippets.map((s, i) => <div key={i} className="snippet">{s}</div>)}
                  </div>
                </div>
                <div className="dev-card-footer">
                  <span className="card-saves">{card.saves}</span>
                  <button className="card-share" onClick={() => handleShare(card.title)}>Share Card</button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="page-empty">
              <p>No cards match your search. Try a different keyword or filter.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
