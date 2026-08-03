"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Application Process", href: "/application-process" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const pillBgRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Auto-hide on scroll down, reappear on scroll up — otherwise the fixed
  // bar sits on top of scrolled-into content indefinitely (most visible
  // over the home hero's pinned acts). Skipped while the mobile menu is
  // open so it doesn't slide away mid-interaction.
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (!isOpen) {
        setHidden(currentY > 120 && currentY > lastScrollY.current);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const duration = prefersReducedMotion ? 0 : 0.4;

    gsap.to(navRef.current, {
      yPercent: hidden ? -130 : 0,
      paddingTop: scrolled ? "0.5rem" : "1.25rem",
      paddingBottom: scrolled ? "0.5rem" : "1.25rem",
      duration,
      ease: "power2.out",
    });
    gsap.to(pillBgRef.current, {
      opacity: scrolled ? 1 : 0,
      duration,
      ease: "power2.out",
    });
  }, [scrolled, hidden]);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 py-5">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between px-8 py-3 rounded-full border border-gold-pale/10 transition-colors">
          {/* Scroll-crossfaded dark glass background, GSAP-driven */}
          <div
            ref={pillBgRef}
            className="glass-brand-dark absolute inset-0 rounded-full opacity-0 -z-10"
          />

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-off-white p-1 shadow-sm group-hover:scale-110 transition-all duration-300">
              <Image
                src="/unnamed.png"
                alt="Habbah Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-display text-2xl font-medium tracking-tight text-off-white">
              HABBAH
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-body text-sm font-medium transition-all relative group ${
                    isActive ? "text-gold-rich" : "text-gold-pale/70 hover:text-gold-pale"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px bg-gold-rich transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="font-body text-sm tracking-widest uppercase bg-gold-rich text-green-deep px-6 py-2.5 rounded-full font-medium hover:bg-off-white transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gold-pale"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 lg:hidden"
          >
            <div className="glass-brand-dark rounded-3xl p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-lg font-medium text-gold-pale hover:text-gold-rich"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="font-body text-sm tracking-widest uppercase bg-gold-rich text-green-deep px-6 py-3 rounded-xl font-medium text-center"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
