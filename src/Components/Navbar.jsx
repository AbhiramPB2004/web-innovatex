import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-opacity-20 bg-black shadow-lg z-50">
      <ul className="flex justify-center items-center gap-10 py-4">
        {["dashboard", "about", "events", "contact"].map((section) => (
          <li key={section}>
            <ScrollLink
              to={section}
              smooth={true}
              duration={500}
              className="text-lg font-bold uppercase tracking-wide text-white neon-hover cursor-pointer"
            >
              {section}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
