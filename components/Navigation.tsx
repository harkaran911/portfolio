"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(5,5,15,0.9)] backdrop-blur-md border-b border-[rgba(0,245,255,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-orbitron text-lg font-bold text-[#00f5ff] tracking-widest"
            style={{ textShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            KS<span className="text-[#ff007a]">.</span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`font-mono-tech text-xs tracking-[0.2em] transition-all duration-200 relative group ${
                  active === link.href ? "text-[#00f5ff]" : "text-[#6b7db3] hover:text-[#00f5ff]"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#00f5ff] transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  style={{ boxShadow: "0 0 8px #00f5ff" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-0.5 bg-[#00f5ff] origin-center"
                style={{ boxShadow: "0 0 6px #00f5ff" }}
                animate={{
                  width: i === 1 && mobileOpen ? "50%" : "24px",
                  rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y: mobileOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[rgba(5,5,15,0.95)] border-b border-[rgba(0,245,255,0.15)] backdrop-blur-md"
          >
            <div className="section-container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="font-mono-tech text-xs tracking-[0.2em] text-[#6b7db3] hover:text-[#00f5ff] text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
