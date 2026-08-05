"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  Building2,
  UserPlus,
  Sprout,
  ArrowRight,
  Mail,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import { gsap } from "@/lib/gsap";

const WAYS = [
  {
    icon: HeartHandshake,
    title: "Donate",
    desc: "Give towards Qarz-e-Hasna, Elevated Pathways, or Home & Family Care. Every gift becomes a seed for a student's future.",
    href: "/contact",
    cta: "Donate",
  },
  {
    icon: Building2,
    title: "Partner",
    desc: "Bring your institution's capability, space, or community to the table — and share the field with us.",
    href: "/partners",
    cta: "Become a partner",
  },
  {
    icon: UserPlus,
    title: "Refer a Student",
    desc: "Know a young person whose talent has already proven itself? Point them towards a pathway that fits.",
    href: "/qarz-e-hasna",
    cta: "Refer someone",
  },
  {
    icon: Sprout,
    title: "Sponsor a Programme",
    desc: "Fund a full cohort — a classroom, a community, or a complete sixteen-week journey.",
    href: "/contact",
    cta: "Sponsor a cohort",
  },
];

const PROMISES = [
  "Every contribution is a trust, held with care",
  "No-interest, no-pressure — always",
  "Your support becomes capability, not dependency",
  "Long-term growth over short-term optics",
];

export default function Contribute() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".way-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".contribute-cta", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contribute-cta", start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Grow With Us"
        title="Contribute"
        accent="to the Growth"
        subtitle="Every seed needs good soil. Yours can be the soil a young person grows in — through giving, partnership, sponsorship, or a simple referral."
        image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Hands planting a seed"
      />

      {/* Ways to contribute */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="Ways to Contribute"
          subtitle="Four ways to walk alongside capable students — choose the one that fits you."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {WAYS.map((way, idx) => (
            <GlassCard
              key={idx}
              animateOnScroll={false}
              className="way-card p-10 flex flex-col hover:border-gold-rich transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-5 bg-green-deep text-gold-rich rounded-3xl shadow-xl group-hover:rotate-6 transition-transform">
                  <way.icon className="w-8 h-8" />
                </div>
                <span className="font-display text-5xl font-light text-gold-rich/20">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="font-display text-3xl font-medium text-green-deep mb-4">
                {way.title}
              </h3>
              <p className="font-body text-charcoal-soft leading-relaxed mb-8">
                {way.desc}
              </p>
              <Link
                href={way.href}
                className="mt-auto inline-flex items-center gap-2 font-body font-medium text-green-deep uppercase tracking-widest text-sm group/btn"
              >
                {way.cta}
                <ArrowRight className="w-4 h-4 text-gold-deep group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Promise band */}
      <section className="bg-cream-warm py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-gold-rich/10 rounded-full -mr-80 -mt-80 blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="What Your Support Carries"
            subtitle="The promises that shape every contribution we receive."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {PROMISES.map((promise, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full border-2 border-dashed border-gold-rich/40 flex items-center justify-center mb-6">
                  <div className="w-4 h-4 bg-gold-rich rounded-full" />
                </div>
                <p className="font-body text-charcoal-soft leading-relaxed">{promise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="contribute-cta glass-brand-dark rounded-[4rem] p-14 md:p-20 text-center text-off-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-125 h-125 bg-gold-rich/10 rounded-full -mr-64 -mt-64 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-green-rich/40 rounded-full -ml-48 -mb-48 blur-[80px]" />

          <div className="relative z-10">
            <div className="inline-block px-6 py-2 rounded-full bg-off-white/5 border border-gold-rich/20 text-gold-rich text-sm font-medium uppercase tracking-[0.3em] mb-8">
              Together, we grow
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-8 leading-[1.1]">
              Plant a seed. <br />
              <span className="gold-shimmer-text">Watch a tree grow.</span>
            </h2>
            <p className="font-body text-xl text-off-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Write to us and tell us how you&apos;d like to contribute — we
              will find the pathway that fits.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="font-body bg-gold-rich hover:bg-off-white text-green-deep px-12 py-6 rounded-full font-medium text-xl transition-all hover:-translate-y-1 flex items-center gap-3"
              >
                <Mail className="w-6 h-6" />
                Write to us
              </Link>
              <Link
                href="/elevated-pathways"
                className="font-body border border-gold-rich/50 hover:border-gold-rich text-gold-pale hover:text-gold-rich px-12 py-6 rounded-full font-medium text-xl transition-all hover:-translate-y-1"
              >
                See our programmes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
