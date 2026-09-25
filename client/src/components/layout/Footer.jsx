import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand-col">
          <span className="footer__brand">Equipment Rental Portal</span>
          <p className="footer__description">
            Reliable equipment rentals for construction, infrastructure, maintenance and
            industrial projects.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <a href="/#equipment" className="footer__link">
            Equipment
          </a>
          <a href="/#categories" className="footer__link">
            Categories
          </a>
          <a href="/#how-it-works" className="footer__link">
            How It Works
          </a>
          <Link to="/admin/bookings" className="footer__link">
            Admin Bookings
          </Link>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Equipment Rental Portal. All rights reserved.</span>
      </div>
    </footer>
  );
}
