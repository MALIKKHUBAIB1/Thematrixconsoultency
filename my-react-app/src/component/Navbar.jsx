import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-400 border-b-2 border-blue-400 pb-1"
      : "hover:text-blue-300";

  return (
    <motion.nav
      role="navigation"
      aria-label="Main Navigation"
      className={`fixed w-full top-0 left-0 z-50 bg-[#000D51] text-white transition-all ${
        scrolled ? "shadow-lg" : ""
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* SEO H1 (hidden visually but useful for Google) */}
      <h1 className="sr-only">
        Matrix Services – Banking Career & Job Assistance
      </h1>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-0 h-20">
        {/* LOGO (SEO LINK) */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Matrix Services Logo - Banking Career Guidance"
            className="w-40 h-18 rounded-2xl"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-10 text-lg">
          <li>
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className={isActive("/services")}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive("/contact")}>
              Contact
            </Link>
          </li>
        </ul>

        {/* ADMIN BUTTON */}
        <Link to="/admin/login">
          <button
            aria-label="Admin Login"
            className="hidden md:block px-6 py-2 border border-white hover:bg-white hover:text-[#000D51] transition"
          >
            Admin Login
          </button>
        </Link>

        {/* MOBILE ICON */}
        <button
          className="md:hidden"
          aria-label="Toggle Menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#000D51] overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-6 text-lg py-6">
              <li>
                <Link to="/" onClick={closeMenu} className={isActive("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={closeMenu}
                  className={isActive("/services")}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className={isActive("/about")}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className={isActive("/contact")}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <Link to="admin/login">
              <button className="mx-auto block px-6 py-2 mb-6 border border-white hover:bg-white hover:text-[#000D51] transition">
                Admin Login
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
