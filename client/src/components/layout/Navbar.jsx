import { useState } from "react";
import { Link } from "react-router-dom";

// Section links are plain in-page anchors on purpose: from the landing
// page itself the browser jumps to the fragment with no reload (native
// behaviour once path already matches), and from any other route it
// does a normal navigation to "/" followed by the jump. That gets a
// working nav from every page without adding routing/scroll logic to
// the shared Navbar, which the existing routes don't need.
const SECTION_LINKS = [
  { label: "Equipment", href: "/#equipment" },
  { label: "Categories", href: "/#categories" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar__brand-mark" aria-hidden="true" />
          Equipment Rental Portal
        </Link>

        <nav className="navbar__links navbar__links--desktop" aria-label="Primary">
          {SECTION_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
          <Link to="/admin/login" className="navbar__link">
            Admin Portal
          </Link>
        </nav>

        <a href="/#equipment" className="navbar__cta navbar__cta--desktop">
          Browse Equipment
        </a>

        <button
          type="button"
          className="navbar__menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="navbar__mobile-panel" aria-label="Primary mobile">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link to="/admin/login" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            Admin Portal
          </Link>
          <a href="/#equipment" className="navbar__cta navbar__cta--mobile" onClick={() => setMenuOpen(false)}>
            Browse Equipment
          </a>
        </nav>
      )}
    </header>
  );
}
