"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AnimationItem } from "lottie-web";
import { gsap } from "@/lib/gsap";
import GoldParticles from "./GoldParticles";
import GrowthTree from "./GrowthTree";
import { AYAH } from "@/lib/ayah";

// Three-act scroll sequence. The outer section is a tall (400vh) scroll
// runway; the inner panel is CSS `position: sticky`, so it stays glued to
// the viewport for that whole runway with zero JS position hacking — no
// GSAP `pin`, no pin-spacer, nothing that can fight Lenis's smooth-scroll
// over who owns `position: fixed`. A plain scrubbed timeline (trigger =
// the tall section, no `pin`) crossfades the three acts as the user
// scrolls through the runway.
//
// Under prefers-reduced-motion (or when JS never runs), Tailwind's
// motion-reduce: variants collapse the runway back to its natural height
// and the acts become plain stacked full-height sections in normal
// document flow — no sticky, no scrub, just readable content.
const ACT_CLASS =
  "absolute inset-0 flex items-center justify-center motion-reduce:static motion-reduce:min-h-screen motion-reduce:py-24";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const treeAnimRef = useRef<AnimationItem | null>(null);
  const [treeReady, setTreeReady] = useState(false);

  const handleTreeReady = (anim: AnimationItem) => {
    treeAnimRef.current = anim;
    setTreeReady(true);
  };

  // The gold sweep across "Lasting growth." — a small ambient loop that's
  // independent of the scroll sequence and safe to always run.
  useEffect(() => {
    const tween = gsap.to(".hero-shimmer", {
      backgroundPosition: "250% center",
      duration: 4,
      repeat: -1,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !treeAnimRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const anim = treeAnimRef.current;
    const frameProxy = { frame: 0 };
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      gsap.set([".act-2", ".act-3"], { autoAlpha: 0 });
      gsap.set(".act-1", { autoAlpha: 1 });
      anim.goToAndStop(0, true);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl
        // Act 1 — حبّة. A beat of stillness before the name of a single
        // seed appears.
        .from(imageWrapRef.current, { scale: 1.15, duration: 1, ease: "power2.out" }, 0)
        .from(".hero-overlay", { opacity: 0, duration: 0.6 }, 0)
        .to({}, { duration: 0.5 })
        .from(".act1-mark", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" })
        .from(".act1-label", { opacity: 0, duration: 0.4 }, "-=0.25")
        .to({}, { duration: 0.6 })
        .to(".act1-inner", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" })
        .set(".act-1", { autoAlpha: 0 })
        .set(".act-2", { autoAlpha: 1 })

        // Act 2 — the seed becomes a tree: the whole premise of Habbah,
        // help one and the growth compounds. The tree is an authored Lottie
        // morph (see GrowthTree.tsx) scrubbed frame-by-frame off this same
        // scroll-linked timeline, so it grows in lockstep with the text
        // instead of playing on its own clock.
        .from(".act2-eyebrow", { opacity: 0, y: 16, duration: 0.4 })
        .from(".growth-tree-wrap", { opacity: 0, scale: 0.85, duration: 0.4 }, "<")
        .from(
          ".hero-line",
          { yPercent: 110, stagger: 0.15, duration: 0.7, ease: "power4.out" },
          "-=0.1"
        )
        .to(
          frameProxy,
          {
            frame: anim.totalFrames - 1,
            duration: 3.2,
            ease: "power1.inOut",
            onUpdate: () => anim.goToAndStop(frameProxy.frame, true),
          },
          "-=0.2"
        )
        .from(".act2-sub", { opacity: 0, y: 16, duration: 0.4 }, "-=0.9")
        .from(".hero-cta", { opacity: 0, y: 16, stagger: 0.1, duration: 0.4 }, "-=0.5")
        .to({}, { duration: 0.5 })
        .to(".act2-inner", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" })
        .set(".act-2", { autoAlpha: 0 })
        .set(".act-3", { autoAlpha: 1 })

        // Act 3 — the ayah the trust is named for: a single habbah, grown
        // into abundance.
        .from(".act3-line", { scaleX: 0, duration: 0.35, ease: "power2.out" })
        .from(".ayah-arabic", { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.05")
        .from(".ayah-translation", { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
        .from(".ayah-ref", { opacity: 0, duration: 0.4 }, "-=0.1")
        .to({}, { duration: 0.7 });

      // Autoplay: if the user never scrolls, narrate all three acts on
      // their own so the story still plays without any input — looping
      // back to Act 1 after a beat if they keep sitting still. The instant
      // real scroll/touch/keyboard input arrives, autoplay is cancelled
      // for good and the ScrollTrigger above takes over; its scrub(1)
      // smoothing glides the acts back in sync with wherever the user has
      // actually scrolled to, instead of snapping.
      const autoplay = gsap.to(tl, {
        progress: 1,
        duration: 18,
        ease: "none",
        repeat: -1,
        repeatDelay: 1.5,
      });

      const stopAutoplay = () => {
        autoplay.kill();
        window.removeEventListener("wheel", stopAutoplay);
        window.removeEventListener("touchstart", stopAutoplay);
        window.removeEventListener("keydown", stopAutoplay);
      };
      window.addEventListener("wheel", stopAutoplay, { passive: true });
      window.addEventListener("touchstart", stopAutoplay, { passive: true });
      window.addEventListener("keydown", stopAutoplay);
      cleanups.push(stopAutoplay);

      // Magnetic pull on the CTA buttons, pointer-capable devices only.
      if (window.matchMedia("(pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>(".magnetic").forEach((el) => {
          const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

          const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            moveX((e.clientX - rect.left - rect.width / 2) * 0.35);
            moveY((e.clientY - rect.top - rect.height / 2) * 0.35);
          };
          const handleLeave = () => {
            moveX(0);
            moveY(0);
          };

          el.addEventListener("mousemove", handleMove);
          el.addEventListener("mouseleave", handleLeave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", handleLeave);
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [treeReady]);

  const scrollToExplore = (e: ReactMouseEvent) => {
    e.preventDefault();
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[400vh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
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

        <div className="relative z-10 h-full w-full motion-reduce:h-auto">
          {/* Act 1 — the name */}
          <div className={`act-1 ${ACT_CLASS}`}>
            <div className="act1-inner text-center px-6">
              <p
                className="act1-mark font-arabic text-gold-rich text-[clamp(3.5rem,12vw,9rem)] leading-none"
                dir="rtl"
                lang="ar"
              >
                حبّة
              </p>
              <p className="act1-label mt-6 font-body text-off-white/70 text-xs sm:text-sm tracking-[0.5em] uppercase">
                Habbah — a single seed
              </p>
            </div>
          </div>

          {/* Act 2 — the growth */}
          <div className={`act-2 ${ACT_CLASS}`}>
            <div className="act2-inner w-full max-w-6xl px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-off-white text-center lg:text-left order-2 lg:order-1">
                <p className="act2-eyebrow font-body text-xs tracking-[0.25em] uppercase text-gold-rich mb-6">
                  Habbah Education Trust
                </p>

                <h1 className="font-display font-light leading-none text-[clamp(2.75rem,7vw,6rem)] mb-8">
                  <span className="block overflow-hidden">
                    <span className="hero-line block">Small seeds.</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="hero-line hero-shimmer gold-shimmer-text block">
                      Lasting growth.
                    </span>
                  </span>
                </h1>

                <p className="act2-sub font-body font-light text-lg md:text-xl leading-relaxed text-off-white/80 max-w-xl mx-auto lg:mx-0 mb-10">
                  Help one student today, and a single seed can grow into a
                  complete tree of opportunity — for them, and for everyone
                  they go on to support.
                </p>

                <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                  <Link
                    href="#explore"
                    onClick={scrollToExplore}
                    className="hero-cta magnetic font-body text-sm tracking-[0.15em] uppercase bg-gold-rich text-green-deep px-10 py-4 hover:bg-off-white transition-colors"
                  >
                    Explore Our Work
                  </Link>
                  <Link
                    href="/about"
                    className="hero-cta magnetic font-body text-sm tracking-[0.15em] uppercase border border-gold-rich/50 text-gold-pale px-10 py-4 hover:border-gold-rich hover:text-gold-rich transition-colors"
                  >
                    Our Story
                  </Link>
                </div>
              </div>

              <GrowthTree
                className="growth-tree-wrap w-64 sm:w-80 lg:w-md mx-auto order-1 lg:order-2"
                onReady={handleTreeReady}
              />
            </div>
          </div>

          {/* Act 3 — the ayah */}
          <div className={`act-3 ${ACT_CLASS}`}>
            <div className="act3-inner max-w-3xl mx-auto px-6 text-center">
              <div className="act3-line h-px w-16 bg-gold-rich mx-auto mb-10 origin-center" />

              <p
                className="ayah-arabic font-arabic text-gold-pale text-[clamp(1.3rem,3vw,2.1rem)] leading-[2.1] mb-8"
                dir="rtl"
                lang="ar"
              >
                {AYAH.arabic}
              </p>

              <p className="ayah-translation font-body italic text-off-white/75 text-[clamp(0.95rem,1.5vw,1.1rem)] leading-loose max-w-2xl mx-auto mb-6">
                {AYAH.translations.en.text}
              </p>

              <span className="ayah-ref font-arabic text-sm text-gold-rich/80" dir="rtl">
                {AYAH.reference}
              </span>

              <div className="h-px w-16 bg-gold-rich mx-auto mt-10" />
            </div>
          </div>
        </div>

        <div className="hero-scroll-cue absolute bottom-10 inset-x-0 z-20 flex items-center justify-center gap-4 text-gold-pale/60 pointer-events-none motion-reduce:hidden">
          <span className="font-body text-[0.7rem] tracking-[0.2em] uppercase">
            Scroll to explore
          </span>
          <div className="h-px w-10 bg-gold-rich animate-pulse" />
        </div>
      </div>
    </section>
  );
}
