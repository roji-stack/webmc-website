import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const [socials, setSocials] = useState({
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  });

  useEffect(() => {
    fetch("/content/about.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.socials) {
          setSocials(data.socials);
        }
      })
      .catch((err) => console.error("Error loading navbar socials:", err));
  }, []);

  const navItems = [
    { name: "About", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Competitions", path: "/competitions" },
    { name: "Team", path: "/team" }
  ];

  const isActive = (itemPath) => {
    if (itemPath === "/") {
      return path === "/";
    }
    return path.startsWith(itemPath);
  };

  return (
    <nav className="bg-white sticky top-0 z-20 border-b border-[#E8E4F0]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-wu-purple group-hover:bg-wu-purple-light transition-colors">
            WE
          </div>
          <span className="text-sm font-semibold hidden sm:block text-wu-purple group-hover:text-wu-purple-light transition-colors">
            Western Engineering BMC
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className="transition-colors no-underline text-gray-500 hover:text-wu-purple"
                style={{
                  color: active ? "#4F2683" : undefined,
                  fontWeight: active ? 600 : 400,
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Socials & CTA */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-wu-purple transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-wu-purple transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          <button className="text-xs font-semibold px-4 py-2 rounded text-white bg-wu-purple hover:bg-wu-purple-light transition-colors">
            Join Club
          </button>
        </div>
      </div>
    </nav>
  );
}

