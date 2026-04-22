import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

const STACK = ['Angular', '.NET / C#', 'TypeScript', 'SQL Server', 'Azure', 'GitHub Copilot', 'Cursor', 'IIS'];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="majd-section page-section">
        <div className="majd-inner">
          <div className="majd-avatar">
            <div className="majd-photo-placeholder">
              <div className="majd-frame"></div>
              <div className="majd-initials">M</div>
            </div>
            <div className="majd-handle">@majdst_codes</div>
          </div>
          <div className="majd-content">
            <div className="section-eyebrow">// the_human_behind_this</div>
            <h1 className="section-heading">Hey, I'm Majd.</h1>
            <p className="majd-bio">
              <strong>Full-stack software engineer</strong> based in the UAE, building real production
              apps daily — Angular, .NET, SQL Server, Azure. I've hit every bug on this site in actual
              production systems, which means everything here is tested by suffering.<br /><br />
              I started <strong>@majdst_codes</strong> because I was tired of dev content that's either
              too theoretical or just AI tool announcements. This is practical. This is real. And
              sometimes it's a meme.<br /><br />
              Every week I drop one dev card, one challenge, and one meme that teaches something real.
              No AI news recap. No LinkedIn inspiration posts. Just code.
            </p>
            <div className="majd-stack">
              {STACK.map((tech) => <span key={tech} className="stack-pill">{tech}</span>)}
            </div>
            <div className="majd-socials">
              <a href="https://tiktok.com/@majdst_codes" target="_blank" rel="noopener noreferrer" className="social-link">↗ TikTok</a>
              <a href="https://instagram.com/majdst_codes" target="_blank" rel="noopener noreferrer" className="social-link">↗ Instagram</a>
              <a href="https://youtube.com/@majdst_codes" target="_blank" rel="noopener noreferrer" className="social-link">↗ YouTube</a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="cta-section">
        <div className="cta-glow"></div>
        <div className="section-eyebrow">// join_the_community</div>
        <h2 className="section-heading">
          Get the Weekly <span className="primary">DevDose</span>
        </h2>
        <p className="cta-sub">One dev card, one challenge, one meme. Every week. No AI news. No fluff.</p>
        <div className="cta-input-row">
          <input className="cta-input" type="email" placeholder="your@email.com" aria-label="Email" />
          <button className="cta-submit">Subscribe →</button>
        </div>
      </section>

      <Footer />
    </>
  );
}

