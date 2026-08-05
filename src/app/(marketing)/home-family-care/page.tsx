"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Handshake,
  HeartHandshake,
  Sprout,
  ArrowRight,
  CheckCircle2,
  Home,
  Baby,
  Stethoscope,
  MessageSquare,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import { gsap } from "@/lib/gsap";

const AREAS = [
  {
    title: "Home Care & Household Management",
    desc: "Practical skills for running a home with dignity and professionalism.",
    icon: Home,
  },
  {
    title: "Early Childhood Care Fundamentals",
    desc: "Safe, nurturing care for the youngest members of a family.",
    icon: Baby,
  },
  {
    title: "Family Health Awareness",
    desc: "Everyday health knowledge that keeps families strong from the inside out.",
    icon: Stethoscope,
  },
  {
    title: "Communication & Care Ethics",
    desc: "How to care well — with respect, boundaries, and trust.",
    icon: MessageSquare,
  },
];

const PILOT_NOTES = [
  "Programme design is being shaped with our partner community",
  "Pilot cohorts planned for 2027",
  "Details will be announced here as they are confirmed",
];

export default function HomeFamilyCare() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".partner-badge", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".partner-badge", start: "top 85%" },
      });

      gsap.from(".care-intro", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".care-intro", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".area-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".care-partner", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".care-partner", start: "top 85%" },
      });

      gsap.from(".care-status", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".care-status", start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Our Work — Care & Family Services"
        title="Home & Family"
        accent="Care Pathways"
        subtitle="Care as a skill. Home as a starting point. Community as the destination."
        image="https://images.unsplash.com/photo-1507656704-8c9c-b5a1a62c0c9c?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Care in a home setting"
      />

      {/* Partner Badge */}
      <section className="container mx-auto px-4 -mt-12 relative z-30">
        <div className="partner-badge glass-brand max-w-3xl mx-auto rounded-full px-8 py-4 flex items-center justify-center gap-3 shadow-xl">
          <Handshake className="w-6 h-6 text-gold-deep shrink-0" />
          <p className="font-body font-medium text-green-deep text-lg text-center">
            In partnership with Idara Al Khair
          </p>
        </div>
      </section>

      {/* What this programme does */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="care-intro space-y-8">
            <SectionHeader title="Care as a Livelihood" center={false} />
            <p className="font-body text-xl md:text-2xl text-charcoal-soft leading-relaxed">
              Habbah&apos;s Home &amp; Family Care Pathways prepare young people —{" "}
              <span className="text-green-deep font-medium">especially women</span> —
              for dignified livelihoods in home care, early childhood support,
              and family services.
            </p>
            <div className="glass-brand p-8 rounded-3xl border-l-8 border-gold-rich shadow-xl">
              <HeartHandshake className="w-8 h-8 text-gold-deep mb-4" />
              <p className="font-body text-charcoal-soft leading-relaxed">
                This is not just a skill. It is a calling — one that strengthens
                families from the inside out.
              </p>
            </div>
          </div>

          <div className="relative h-125 rounded-[3rem] overflow-hidden border-8 border-off-white shadow-2xl group">
            <Image
              src="/unnamed (7).jpg"
              alt="Women gaining skills in care work"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-green-deep/10" />
          </div>
        </div>
      </section>

      {/* Programme areas */}
      <section className="bg-cream-warm py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-gold-rich/10 rounded-full -mr-80 -mt-80 blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Programme Areas"
            subtitle="The pathways being designed — details to be confirmed with our partner community."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {AREAS.map((area, idx) => (
              <GlassCard
                key={idx}
                animateOnScroll={false}
                className="area-card p-8 hover:border-gold-rich transition-all"
              >
                <div className="p-4 bg-green-deep text-gold-rich rounded-2xl shadow-xl mb-6 w-fit group-hover:rotate-6 transition-transform">
                  <area.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-medium text-green-deep mb-3">
                  {area.title}
                </h3>
                <p className="font-body text-charcoal-soft leading-relaxed">{area.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="container mx-auto px-4">
        <div className="care-partner grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-dashed border-gold-rich/30 rounded-[4.5rem] -rotate-3" />
            <div className="relative h-125 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-off-white bg-off-white">
              <Image
                src="/unnamed (8).jpg"
                alt="Community gathering"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <SectionHeader title="Idara Al Khair" center={false} />
            <p className="font-body text-xl text-charcoal-soft leading-relaxed">
              Habbah works with <span className="text-green-deep font-medium">Idara Al Khair</span> to
              reach young people in underserved communities — providing not just
              training but a wider ecosystem of dignity and support.
            </p>
            <p className="font-body text-lg text-charcoal-soft leading-relaxed">
              Al Khair provides the ecosystem — the community, the trust, the
              space — while Habbah enriches the educational layer.
            </p>
            <Link
              href="/partners/al-khair"
              className="inline-flex items-center gap-3 font-body bg-green-deep text-off-white px-8 py-4 rounded-full font-medium hover:bg-gold-rich hover:text-green-deep transition-all hover:-translate-y-0.5"
            >
              Learn about our work at Al Khair
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="container mx-auto px-4">
        <div className="care-status glass-brand-dark rounded-[3rem] p-12 md:p-16 text-center text-off-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-100 h-100 bg-gold-rich/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-green-mid/30 border border-green-light/40 text-green-light font-body text-sm font-medium uppercase tracking-[0.2em] mb-8">
              <Sprout className="w-4 h-4" />
              In active development
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-8 leading-[1.15]">
              Pilots launching <span className="gold-shimmer-text">2027</span>
            </h2>
            <ul className="max-w-2xl mx-auto text-left space-y-4 mb-12">
              {PILOT_NOTES.map((note, idx) => (
                <li key={idx} className="flex items-start gap-4 font-body text-off-white/70 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-gold-rich shrink-0 mt-1" />
                  {note}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-body bg-gold-rich text-green-deep px-10 py-5 rounded-full font-medium text-lg hover:bg-off-white transition-all hover:-translate-y-1"
            >
              Reach out to learn more
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
