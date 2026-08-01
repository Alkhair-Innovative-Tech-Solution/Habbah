"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import GoldParticles from "./GoldParticles";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.to(".hero-shimmer", {
        backgroundPosition: "250% center",
        duration: 4,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      if (prefersReducedMotion) {
        gsap.set(
          [".hero-eyebrow", ".hero-word", ".hero-sub", ".hero-cta", ".hero-scroll-cue"],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(imageWrapRef.current, { scale: 1.15, duration: 2.5, ease: "power2.out" }, 0)
        .from(".hero-overlay", { opacity: 0, duration: 1.5 }, 0)
        .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.6)
        .from(
          ".hero-word",
          { y: 60, opacity: 0, rotateX: 15, stagger: 0.07, duration: 0.9, ease: "power3.out" },
          0.9
        )
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.7 }, 1.6)
        .from(".hero-cta", { y: 20, opacity: 0, stagger: 0.15, duration: 0.5 }, 1.9)
        .from(".hero-scroll-cue", { opacity: 0, duration: 0.5 }, 2.3);

      gsap.to(imageWrapRef.current, {
        scale: 1.0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen h-screen overflow-hidden flex items-center"
    >
      <div ref={imageWrapRef} className="absolute inset-0 scale-105">
        {/*
          Placeholder: no cinematic hero video exists yet. Swap this Image for
          the <video autoPlay muted loop playsInline> montage once footage is
          shot (see build brief, hero video content table).
        */}
        <Image
          src="/unnamed (9).jpg"
          alt="Habbah programme participants"
          fill
          priority
          className="object-cover"
        />
        <div
          className="hero-overlay absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(26,53,40,0.88) 0%, rgba(44,84,64,0.78) 50%, rgba(26,53,40,0.92) 100%)",
          }}
        />
      </div>

      <GoldParticles />

      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl px-6 sm:px-10 lg:px-32 text-off-white"
      >
        <p className="hero-eyebrow font-body text-xs tracking-[0.25em] uppercase text-gold-rich mb-6">
          Habbah Education Trust
        </p>

        <h1 className="font-display font-light leading-none text-[clamp(3rem,9vw,7.5rem)] mb-8">
          <span className="hero-word inline-block">Small</span>{" "}
          <span className="hero-word inline-block">seeds.</span>
          <br />
          <span className="hero-word hero-shimmer gold-shimmer-text inline-block">
            Lasting
          </span>{" "}
          <span className="hero-word hero-shimmer gold-shimmer-text inline-block">
            growth.
          </span>
        </h1>

        <p className="hero-sub font-body font-light text-lg md:text-xl leading-relaxed text-off-white/80 max-w-xl mb-12">
          Helping young people stand with dignity, rise with purpose, and serve with
          responsibility.
        </p>

        <div className="flex flex-wrap gap-6">
          <Link
            href="#ayah"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("ayah")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-cta font-body text-sm tracking-[0.15em] uppercase bg-gold-rich text-green-deep px-10 py-4 hover:bg-off-white transition-colors"
          >
            Explore Our Work
          </Link>
          <Link
            href="/about"
            className="hero-cta font-body text-sm tracking-[0.15em] uppercase border border-gold-rich/50 text-gold-pale px-10 py-4 hover:border-gold-rich hover:text-gold-rich transition-colors"
          >
            Our Story
          </Link>
        </div>
      </div>

      <div className="hero-scroll-cue absolute bottom-10 left-6 sm:left-10 lg:left-32 z-10 flex items-center gap-4 text-gold-pale/60">
        <span className="font-body text-[0.7rem] tracking-[0.2em] uppercase">Scroll</span>
        <div className="h-px w-10 bg-gold-rich animate-pulse" />
      </div>
    </section>
  );
}
