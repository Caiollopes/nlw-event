import { Link, useLocation } from "@tanstack/react-router";
import nlwUniteIcon from "../assets/nlw-unite-icon.svg";

interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  { name: "Eventos", path: "/events" },
  { name: "Participantes", path: "/attendees" },
];

export function Header() {
  const location = useLocation();

  const getLinkClass = (path: string) =>
    location.pathname === path ? "text-primary" : "text-gray-700 ";

  return (
    <header className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW Unite" />

      <nav className="flex items-center gap-5">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={getLinkClass(link.path)}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
