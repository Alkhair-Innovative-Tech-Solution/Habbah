"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Globe, Send, Camera, Briefcase } from "lucide-react";
import { gsap } from "@/lib/gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-green-deep text-off-white pt-24 pb-12 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gold-rich/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="footer-reveal space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 overflow-hidden rounded-xl bg-off-white p-1 shadow-sm">
                <Image
                  src="/unnamed.png"
                  alt="Habbah Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-3xl font-medium tracking-tight">HABBAH</span>
            </Link>
            <p className="font-body font-light text-off-white/60 leading-relaxed text-lg">
              Empowering future leaders through quality education and interest-free loans.
              Join us in building a more equitable future.
            </p>
            <div className="flex gap-5">
              {[Globe, Send, Camera].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-3 bg-off-white/5 rounded-2xl hover:bg-gold-rich hover:text-green-deep transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-reveal">
            <h4 className="font-body text-lg font-medium uppercase tracking-[0.2em] text-gold-rich mb-8">Navigation</h4>
            <ul className="space-y-5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Application Process", href: "/application-process" },
                { label: "Success Stories", href: "/success-stories" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-off-white/60 hover:text-off-white transition-all flex items-center gap-3 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gold-rich rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives + Careers */}
          <div className="footer-reveal">
            <h4 className="font-body text-lg font-medium uppercase tracking-[0.2em] text-gold-rich mb-8">Initiatives</h4>
            <ul className="space-y-5">
              {[
                { label: "Interest-free Loans", href: "#" },
                { label: "Scholarships", href: "#" },
                { label: "Mentorship", href: "#" },
                { label: "Career Guidance", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-off-white/60 hover:text-off-white transition-all flex items-center gap-3 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gold-rich rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/careers"
                  className="flex items-center gap-3 group"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-gold-rich/10 hover:bg-gold-rich border border-gold-rich/30 hover:border-gold-rich rounded-xl transition-all duration-300">
                    <Briefcase className="w-4 h-4 text-gold-rich group-hover:text-green-deep transition-colors" />
                    <span className="font-body font-medium text-gold-rich group-hover:text-green-deep transition-colors text-sm uppercase tracking-widest">
                      Careers
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-reveal">
            <h4 className="font-body text-lg font-medium uppercase tracking-[0.2em] text-gold-rich mb-8">Get in Touch</h4>
            <ul className="space-y-6">
              {[
                { Icon: MapPin, text: "North Nazimabad, Karachi" },
                { Icon: Phone, text: "+92 300 0220635" },
                { Icon: Mail, text: "habbahclub@gmail.com" },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-off-white/60">
                  <div className="p-2 bg-off-white/5 rounded-lg shrink-0">
                    <item.Icon className="w-5 h-5 text-gold-rich" />
                  </div>
                  <span className="font-body text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-reveal pt-10 border-t border-off-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-off-white/40 font-body text-xs uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Habbah Educational Trust</p>
          <div className="flex items-center gap-6">
            <Link href="/careers" className="hover:text-gold-rich transition-colors flex items-center gap-1.5">
              <Briefcase className="w-3 h-3" /> We&apos;re Hiring
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-rich rounded-full animate-pulse" />
              <p className="italic normal-case">Powered by Generations School</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
