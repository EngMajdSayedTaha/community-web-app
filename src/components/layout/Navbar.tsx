import { useLocation, useNavigate } from 'react-router-dom';

interface NavLink {
  label: string;
  sectionId: string;
  path: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Dev Cards', sectionId: 'cards', path: '/dev-cards' },
  { label: 'Challenges', sectionId: 'challenges', path: '/challenges' },
  { label: 'About', sectionId: 'about', path: '/about' },
  { label: 'Meme Lab', sectionId: 'memes', path: '/meme-lab' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (link: NavLink) => {
    if (isHome) {
      document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(link.path);
    }
  };

  const handleLogoClick = () => navigate('/');

  return (
    <nav>
      <div className="nav-logo" onClick={handleLogoClick}>
        majdst<span>.codes</span>
      </div>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.sectionId}>
            <a
              href={isHome ? `#${link.sectionId}` : link.path}
              onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => window.open('https://t.me/majdst_codes', '_blank', 'noopener,noreferrer')}>
        Join the Community
      </button>
    </nav>
  );
}
