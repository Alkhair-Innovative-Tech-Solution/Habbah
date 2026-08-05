"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const topLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const sections = [
  {
    label: "Our Work",
    links: [
      { name: "Elevated Pathways — Hunar", href: "/elevated-pathways" },
      { name: "Home & Family Care Pathways", href: "/home-family-care" },
      { name: "University Opportunity (Qarz-e-Hasna)", href: "/qarz-e-hasna" },
    ],
  },
  {
    label: "Partners",
    links: [
      { name: "Idara Al Khair", href: "/partners/al-khair" },
      { name: "Hunar Foundation", href: "/partners/hunar" },
      { name: "Generations School", href: "/partners/generations" },
      { name: "CEF — Character Education Foundation", href: "/partners/cef" },
    ],
  },
];

const endLinks = [
  { name: "Stories", href: "/success-stories" },
  { name: "Contribute", href: "/contribute" },
  { name: "Contact", href: "/contact" },
];

function isSectionActive(pathname: string, hrefs: string[]) {
  return hrefs.some((href) => pathname === href || pathname.startsWith(href + "/"));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const pillBgRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

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
          <div className="hidden lg:flex items-center gap-7">
            {topLinks.map((link) => {
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

            {sections.map((section) => {
              const isActive = isSectionActive(
                pathname,
                section.links.map((l) => l.href)
              );
              return (
                <div key={section.label} className="relative group">
                  <button
                    className={`font-body text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive ? "text-gold-rich" : "text-gold-pale/70 group-hover:text-gold-pale"
                    }`}
                  >
                    {section.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300">
                    <div className="glass-brand-dark rounded-3xl p-3 min-w-72 shadow-2xl">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl font-body text-sm text-gold-pale/80 hover:text-gold-rich hover:bg-off-white/5 transition-all group/item"
                        >
                          {link.name}
                          <ArrowRight className="w-4 h-4 text-gold-rich opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {endLinks.map((link) => {
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
              href="/qarz-e-hasna"
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
            <div className="glass-brand-dark rounded-3xl p-6 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
              {[...topLinks, ...endLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-lg font-medium text-gold-pale hover:text-gold-rich py-1.5"
                >
                  {link.name}
                </Link>
              ))}

              {sections.map((section) => {
                const isOpenSection = openSection === section.label;
                return (
                  <div key={section.label} className="py-1">
                    <button
                      onClick={() =>
                        setOpenSection(isOpenSection ? null : section.label)
                      }
                      className="w-full flex items-center justify-between font-body text-lg font-medium text-gold-pale hover:text-gold-rich py-1.5"
                    >
                      {section.label}
                      <ChevronDown
                        className={`w-5 h-5 text-gold-rich transition-transform duration-300 ${
                          isOpenSection ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpenSection && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pl-4 border-l border-gold-rich/20 mt-1">
                            {section.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-body text-base text-gold-pale/70 hover:text-gold-rich py-2"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/qarz-e-hasna"
                onClick={() => setIsOpen(false)}
                className="font-body text-sm tracking-widest uppercase bg-gold-rich text-green-deep px-6 py-3 rounded-xl font-medium text-center mt-2"
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
