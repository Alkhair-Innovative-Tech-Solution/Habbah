"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Set false inside a grid whose parent already drives entrance animation
   *  via a single GSAP stagger timeline (avoids double-animating each card). */
  animateOnScroll?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  delay = 0,
  animateOnScroll = true,
}: GlassCardProps) {
  const baseClassName = `glass-brand hover:shadow-[0_20px_50px_rgba(201,162,75,0.2)] rounded-[2.5rem] p-8 group relative overflow-hidden transition-all duration-500 ${className}`;

  const inner = (
    <>
      {/* Subtle Shine Effect */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="relative z-10">
        {children}
      </div>
    </>
  );

  // When a parent GSAP timeline owns the entrance animation (e.g. a
  // scroll-triggered stagger across a card grid), render a plain element
  // with a CSS-only hover instead of a motion.div — GSAP writes directly to
  // this node's inline style, and Framer Motion's own style management
  // fights it for control of the same node if both are present.
  if (!animateOnScroll) {
    return (
      <div
        className={`${baseClassName} hover:-translate-y-3 hover:scale-[1.02]`}
      >
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={baseClassName}
    >
      {inner}
    </motion.div>
  );
}
