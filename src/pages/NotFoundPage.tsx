import { useNavigate } from 'react-router-dom';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className="cta-section not-found-section">
        <div className="cta-glow"></div>
        <div className="section-eyebrow">// 404_not_found</div>
        <h1 className="heading-404">404</h1>
        <p className="cta-sub">This page doesn't exist. Or maybe it does and there's a bug.<br />Either way, Majd hasn't fixed it yet.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>← Back to Home</button>
      </section>
      <Footer />
    </>
  );
}

