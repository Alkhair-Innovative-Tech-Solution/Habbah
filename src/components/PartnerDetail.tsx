"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Handshake } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PartnerLogo from "@/components/PartnerLogo";
import { gsap } from "@/lib/gsap";

interface Programme {
  title: string;
  desc: string;
  href?: string;
  cta?: string;
  status?: string;
}

interface PartnerDetailProps {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  name: string;
  intro: string[];
  programmes: Programme[];
  note?: { label: string; text: string };
  primaryCta: { label: string; href: string };
}

export default function PartnerDetail({
  eyebrow,
  title,
  accent,
  subtitle,
  image,
  imageAlt,
  name,
  intro,
  programmes,
  note,
  primaryCta,
}: PartnerDetailProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".partner-hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".partner-hero-badge", start: "top 85%" },
      });

      gsap.from(".partner-intro", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".partner-intro", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".programme-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".partner-note", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".partner-note", start: "top 85%" },
      });

      gsap.from(".partner-cta", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".partner-cta", start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        subtitle={subtitle}
        image={image}
        imageAlt={imageAlt}
      />

      {/* Partner hero badge */}
      <section className="container mx-auto px-4 -mt-12 relative z-30">
        <div className="partner-hero-badge glass-brand max-w-3xl mx-auto rounded-[2.5rem] px-10 py-8 shadow-xl flex items-center gap-8">
          <PartnerLogo name={name} className="w-20 h-20 rounded-3xl text-3xl shadow-xl shrink-0" />
          <div className="flex items-center gap-3">
            <Handshake className="w-6 h-6 text-gold-deep shrink-0" />
            <p className="font-body font-medium text-green-deep text-lg">
              A Habbah partner
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container mx-auto px-4">
        <div className="partner-intro grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 lg:sticky lg:top-32">
            <SectionHeader title={name} center={false} />
            {intro.map((paragraph, idx) => (
              <p
                key={idx}
                className={`font-body leading-relaxed ${
                  idx === 0 ? "text-xl md:text-2xl text-charcoal-soft" : "text-lg text-charcoal-soft"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-8">
            <h3 className="font-display text-3xl md:text-4xl font-medium text-green-deep tracking-tight">
              Programmes <span className="gold-shimmer-text">run here</span>
            </h3>
            <div className="space-y-6">
              {programmes.map((programme, idx) => (
                <GlassCard
                  key={idx}
                  animateOnScroll={false}
                  className="programme-card p-8 hover:border-gold-rich transition-all"
                >
                  {programme.status && (
                    <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-mid/10 border border-green-mid/30 text-green-mid font-body text-xs font-medium uppercase tracking-widest">
                      {programme.status}
                    </span>
                  )}
                  <h4 className="font-display text-2xl font-medium text-green-deep mb-3">
                    {programme.title}
                  </h4>
                  <p className="font-body text-charcoal-soft leading-relaxed mb-6">
                    {programme.desc}
                  </p>
                  {programme.href && (
                    <Link
                      href={programme.href}
                      className="inline-flex items-center gap-2 font-body font-medium text-green-deep uppercase tracking-widest text-sm group/btn"
                    >
                      {programme.cta ?? "Learn more"}
                      <ArrowRight className="w-4 h-4 text-gold-deep group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Note */}
      {note && (
        <section className="container mx-auto px-4">
          <div className="partner-note glass-brand-dark rounded-[3rem] p-10 md:p-14 text-off-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-100 h-100 bg-gold-rich/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className="p-4 bg-gold-rich text-green-deep rounded-2xl shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-medium mb-3">{note.label}</h3>
                <p className="font-body text-lg text-off-white/70 leading-relaxed whitespace-pre-line">
                  {note.text}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="partner-cta glass-brand rounded-[3rem] p-12 md:p-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-light text-green-deep mb-6">
            Walk alongside {name.split(" ")[0]} and Habbah.
          </h2>
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-3 font-body bg-green-deep text-off-white px-10 py-5 rounded-full font-medium text-lg hover:bg-gold-rich hover:text-green-deep transition-all hover:-translate-y-1"
          >
            {primaryCta.label}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
