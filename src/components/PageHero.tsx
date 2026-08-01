"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  /** Word(s) rendered after `title` in the gold shimmer treatment. */
  accent?: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
}

export default function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  image,
  imageAlt,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".page-hero-eyebrow", ".page-hero-word", ".page-hero-sub"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(imageWrapRef.current, { scale: 1.15, duration: 2, ease: "power2.out" }, 0)
        .from(".page-hero-overlay", { opacity: 0, duration: 1.2 }, 0)
        .from(".page-hero-eyebrow", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.4)
        .from(
          ".page-hero-word",
          { y: 40, opacity: 0, stagger: 0.06, duration: 0.7, ease: "power3.out" },
          0.6
        )
        .from(".page-hero-sub", { y: 20, opacity: 0, duration: 0.6 }, 1.1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden"
    >
      <div ref={imageWrapRef} className="absolute inset-0 scale-105">
        <Image src={image} alt={imageAlt} fill priority className="object-cover" />
        <div
          className="page-hero-overlay absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(26,53,40,0.90) 0%, rgba(44,84,64,0.80) 50%, rgba(26,53,40,0.94) 100%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="page-hero-eyebrow font-body text-xs tracking-[0.25em] uppercase text-gold-rich mb-6">
            {eyebrow}
          </p>

          <h1 className="font-display font-light text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.0] text-off-white mb-6">
            {words.map((w, i) => (
              <span key={i}>
                <span className="page-hero-word inline-block">{w}</span>{" "}
              </span>
            ))}
            {accent && (
              <span className="page-hero-word gold-shimmer-text inline-block">
                {accent}
              </span>
            )}
          </h1>

          {subtitle && (
            <p className="page-hero-sub font-body font-light text-lg md:text-xl text-off-white/75 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
