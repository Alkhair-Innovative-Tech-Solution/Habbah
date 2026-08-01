"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SESSION_KEY = "habbah-loader-shown";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || !loaderRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    tl.from(".loader-arabic", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" })
      .from(
        ".loader-english",
        { opacity: 0, letterSpacing: "0em", duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
      .from(".loader-line", { scaleX: 0, transformOrigin: "left", duration: 0.6 }, "-=0.3")
      .to(loaderRef.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut", delay: 0.4 });

    return () => {
      tl.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-green-deep"
    >
      <p className="loader-arabic font-arabic text-gold-rich text-5xl md:text-6xl mb-4" lang="ar">
        حبّة
      </p>
      <p className="loader-english font-body text-off-white text-sm tracking-[0.4em] uppercase">
        Habbah
      </p>
      <div className="loader-line mt-6 h-px w-16 bg-gold-rich" />
    </div>
  );
}
