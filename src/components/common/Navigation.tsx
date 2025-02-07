// src/components/common/Navigation.tsx
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "./ThemeContext";
import LogoImage from "./LogoImage";
import logo from "../../assets/logo.png";

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const smoothScroll = (targetId: string): void => {
    const target = document.getElementById(targetId);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // ms
      let start: number | null = null;

      const animation = (currentTime: number): void => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const ease = (t: number, b: number, c: number, d: number): number => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    }
  };

  const handleScroll = () => {
    if (!isHomePage) return;

    const sections = [
      "home",
      "about",
      "skills",
      "experience",
      "projects",
      "contact",
    ];
    
    // current scroll position relative to top of window
    const threshold = 450;
    const y_offset = window.scrollY + threshold;

    for (const section of sections) {
      const scroll_area = document.getElementById(section);

      if (scroll_area) {
        const start = scroll_area.offsetTop;
        const end = start + scroll_area.clientHeight;

        if (y_offset >= start && y_offset <= end) {
          if (!scroll_area.className.includes("active")) {
            setActiveSection(section);
            break;
          }
        }
      }
    }

    setShowNav(window.scrollY > 50);
  };

  useEffect(() => {
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setShowNav(true);
    }
  }, [isHomePage]);

  return (
    <nav className={`creative-portfolio__nav ${showNav ? "visible" : ""}`}>
      <div className="container">
        <NavLink to="/">
          <LogoImage logo={logo} alt="logo" size={50} />
        </NavLink>
        <div className="nav-items">
          {isHomePage ? (
            // Home page navigation
            [
              "Home",
              "About",
              "Skills",
              "Experience",
              "Projects",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-item ${
                  activeSection === item.toLowerCase() ? "active" : ""
                }`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  smoothScroll(item.toLowerCase());
                }}
              >
                {item}
              </a>
            ))
          ) : (
            // Articles page navigation
            <>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              >
                Home
              </NavLink>
              <NavLink
                to="/articles"
                className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              >
                Articles
              </NavLink>
            </>
          )}
          {/* <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />}
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;