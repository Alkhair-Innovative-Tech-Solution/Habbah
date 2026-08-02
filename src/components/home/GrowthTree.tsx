"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import treeData from "@/lib/tree-growth.json";

interface GrowthTreeProps {
  className?: string;
  /** Fires once the animation instance exists and is safe to scrub. */
  onReady?: (anim: AnimationItem) => void;
}

// The seed-to-tree artwork is an authored Lottie animation (a real path
// morph, not just a static illustration) recolored to the Habbah gold/green
// palette — see src/lib/tree-growth.json and the recolor mapping in git
// history. Loaded with autoplay off; Hero.tsx scrubs its frames directly
// off the scroll-linked timeline so it grows in lockstep with everything
// else in Act 2, rather than playing on its own clock.
export default function GrowthTree({ className = "", onReady }: GrowthTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let anim: AnimationItem | undefined;
    let cancelled = false;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !containerRef.current) return;

      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: treeData,
      });

      anim.addEventListener("DOMLoaded", () => {
        if (cancelled || !anim) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          // No scroll-scrub will ever run for these users — show the
          // finished tree rather than leaving it stuck on the seed frame.
          anim.goToAndStop(anim.totalFrames - 1, true);
          return;
        }
        onReady?.(anim);
      });
    });

    return () => {
      cancelled = true;
      anim?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
