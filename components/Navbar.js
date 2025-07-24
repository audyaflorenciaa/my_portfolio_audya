// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/#profile" className="navbar-brand"> {/* Brand also links to profile top */}
          Audya&apos;s Portfolio
        </Link>
        <ul className="navbar-links">
          <li>
            <Link href="/#profile" className="navbar-item"> {/* Link to profile section ID */}
              Profile
            </Link>
          </li>
          <li>
            <Link href="/#projects" className="navbar-item"> {/* Link to projects section ID */}
              Projects
            </Link>
          </li>
          <li>
            <Link href="/#ask-pico" className="navbar-item"> {/* Link to chatbot section ID */}
              Ask Pico
            </Link>
          </li>
          <li>
            <Link href="/#mini-projects" className="navbar-item"> {/* Link to mini projects section ID */}
              Mini AI Section
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}