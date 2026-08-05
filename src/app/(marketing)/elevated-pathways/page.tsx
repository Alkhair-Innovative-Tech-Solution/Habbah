"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Handshake,
  BookOpen,
  Briefcase,
  MessageSquare,
  UserRoundCheck,
  CalendarDays,
  Users,
  Clock,
  CheckCircle2,
  FileText,
  Mic,
  FolderKanban,
  Mail,
  ArrowRight,
  BadgeCheck,
  Shield,
  Heart,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import { gsap } from "@/lib/gsap";

const PILLARS = [
  {
    title: "Character",
    desc: "Who you are shapes how you work.",
    icon: Shield,
  },
  {
    title: "Professional Practice",
    desc: "How workplaces actually function.",
    icon: Briefcase,
  },
  {
    title: "Communication & Soft Skills",
    desc: "How you present and connect.",
    icon: MessageSquare,
  },
  {
    title: "Self-awareness (Shuoor)",
    desc: "Knowing yourself clearly.",
    icon: UserRoundCheck,
  },
];

const DETAILS = [
  { value: "4 months", label: "16 weekly sessions", icon: CalendarDays },
  { value: "1.5–2 hrs", label: "Per session", icon: Clock },
  { value: "~2,000", label: "Students per year", icon: Users },
  { value: "~80%", label: "Girls and women", icon: UserRoundCheck },
];

const MONTHS = [
  {
    month: "Month 1",
    theme: "Foundations & Trust",
    focus: "Self-introduction, discipline, communication, self-reflection",
    icon: BookOpen,
  },
  {
    month: "Month 2",
    theme: "Character & Relationships",
    focus: "Patience, anger management, family relationships, conflict resolution",
    icon: Heart,
  },
  {
    month: "Month 3",
    theme: "Skill Building",
    focus: "Digital identity, CV & interview, networking, workplace fundamentals",
    icon: Briefcase,
  },
  {
    month: "Month 4",
    theme: "Integration & Capstone",
    focus: "Project management, presentations, graduation ceremony",
    icon: FolderKanban,
  },
];

const OUTPUTS = [
  { icon: FileText, text: "A professional CV" },
  { icon: BadgeCheck, text: "A LinkedIn / digital profile" },
  { icon: Mic, text: "Interview skills — practiced in mock interviews" },
  { icon: FolderKanban, text: "A capstone project — planned and executed on ClickUp" },
  { icon: MessageSquare, text: "Public speaking experience — graduation presentation" },
  { icon: Mail, text: "A mentor's personal letter — written for each student" },
];

const STATS = [
  { value: "~2,000", label: "students per year" },
  { value: "~80%", label: "girls and women" },
  { value: "0", label: "tests — progress tracked through observation" },
  { value: "16", label: "sessions culminating in a graduation with family evening and certificates" },
];

export default function ElevatedPathways() {
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

      gsap.utils.toArray<HTMLElement>(".pillar-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".detail-stat").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          delay: (i % 4) * 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".month-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".output-item").forEach((el, i) => {
        gsap.from(el, {
          x: -30,
          opacity: 0,
          delay: i * 0.07,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.from(".stat-band", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stat-band", start: "top 85%" },
      });

      gsap.from(".pathways-cta", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pathways-cta", start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Our Work — Skills & Livelihoods"
        title="Elevated Pathways"
        accent="at Hunar"
        subtitle="Hunar gives capability. Sha'oor gives direction. Together, they open pathways to dignified earning."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Vocational training students at work"
      />

      {/* Partner Badge */}
      <section className="container mx-auto px-4 -mt-12 relative z-30">
        <div className="partner-badge glass-brand max-w-3xl mx-auto rounded-full px-8 py-4 flex items-center justify-center gap-3 shadow-xl">
          <Handshake className="w-6 h-6 text-gold-deep shrink-0" />
          <p className="font-body font-medium text-green-deep text-lg text-center">
            In partnership with Hunar Foundation
          </p>
        </div>
      </section>

      {/* What is Sha'oor */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 lg:sticky lg:top-32">
            <SectionHeader title="What is Sha'oor?" center={false} />
            <p className="font-body text-xl text-charcoal-soft leading-relaxed">
              Hunar Foundation teaches vocational skills. Habbah adds the{" "}
              <span className="text-green-deep font-medium">sha&apos;oor</span> layer —
              the awareness, confidence, and life readiness that converts a skill
              into a livelihood.
            </p>
            <p className="font-body text-lg text-charcoal-soft leading-relaxed">
              Every session stays anchored to four pillars — woven into a
              sixteen-week journey of stories, activities, and real workplace
              practice.
            </p>
            <div className="glass-brand p-8 rounded-3xl border-l-8 border-gold-rich shadow-xl">
              <Sparkles className="w-8 h-8 text-gold-deep mb-4" />
              <p className="font-body text-charcoal-soft leading-relaxed">
                Four months. Sixteen sessions. Zero tests. Progress is tracked
                the way growth actually happens — through observation, and
                through the visible outputs each student builds along the way.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map((pillar, idx) => (
              <GlassCard
                key={idx}
                animateOnScroll={false}
                className="pillar-card p-8 hover:border-gold-rich transition-all"
              >
                <div className="p-4 bg-green-deep text-gold-rich rounded-2xl shadow-xl mb-6 w-fit group-hover:rotate-6 transition-transform">
                  <pillar.icon className="w-7 h-7" />
                </div>
                <div className="font-display text-5xl font-light text-gold-rich/25 leading-none mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-display text-2xl font-medium text-green-deep mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-charcoal-soft leading-relaxed">{pillar.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Details */}
      <section className="bg-cream-warm py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-gold-rich/10 rounded-full -mr-80 -mt-80 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-green-mid/5 rounded-full -ml-64 -mb-64 blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Programme at a Glance"
            subtitle="A 16-week journey built to convert capability into confidence, and confidence into income."
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {DETAILS.map((detail, idx) => (
              <div
                key={idx}
                className="detail-stat bg-off-white rounded-[2rem] p-8 text-center border-b-4 border-gold-rich shadow-xl"
              >
                <detail.icon className="w-8 h-8 text-gold-deep mx-auto mb-4" />
                <div className="font-display text-4xl font-medium text-green-deep mb-2">
                  {detail.value}
                </div>
                <p className="font-body text-gold-deep font-medium uppercase tracking-widest text-xs">
                  {detail.label}
                </p>
              </div>
            ))}
          </div>

          {/* Monthly journey */}
          <div className="mt-20">
            <h3 className="font-display text-3xl md:text-4xl font-medium text-green-deep text-center mb-12 tracking-tight">
              The Monthly <span className="gold-shimmer-text">Journey</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {MONTHS.map((month, idx) => (
                <GlassCard
                  key={idx}
                  animateOnScroll={false}
                  className="month-card flex flex-col hover:border-gold-rich transition-all"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl font-light text-gold-rich/25">
                      {month.month.replace("Month ", "M")}
                    </span>
                    <div className="p-3 bg-green-deep text-gold-rich rounded-2xl shadow-xl">
                      <month.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h4 className="font-display text-2xl font-medium text-green-deep mb-4">
                    {month.theme}
                  </h4>
                  <p className="font-body text-charcoal-soft leading-relaxed mt-auto">
                    {month.focus}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Students Build */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-125 rounded-[3rem] overflow-hidden border-8 border-off-white shadow-2xl group">
            <Image
              src="/unnamed (6).jpg"
              alt="Trainees building their professional portfolios"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-green-deep/10" />
            <div className="absolute bottom-8 left-8 right-8 glass-brand p-6 rounded-3xl shadow-2xl">
              <p className="font-display text-2xl font-medium text-green-deep">
                Six visible outputs, one graduation.
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              title="What Students Build"
              subtitle="Every output is something a student can hold, show, and carry into their first interview."
              center={false}
            />
            <ul className="space-y-5">
              {OUTPUTS.map((output, idx) => (
                <li
                  key={idx}
                  className="output-item flex items-start gap-4 p-5 bg-cream-warm rounded-2xl border border-gold-rich/15 hover:border-gold-rich transition-colors group"
                >
                  <div className="p-2.5 bg-green-deep text-gold-rich rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                    <output.icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-mid shrink-0" />
                    <p className="font-body text-charcoal-soft leading-relaxed">{output.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="container mx-auto px-4">
        <div className="stat-band glass-brand-dark rounded-[4rem] p-14 md:p-20 text-off-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-125 h-125 bg-gold-rich/10 rounded-full -mr-64 -mt-64 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-green-rich/40 rounded-full -ml-48 -mb-48 blur-[80px]" />

          <div className="relative z-10">
            <SectionHeader
              title="Sha'oor at Scale"
              subtitle="A programme designed to move with the community it serves."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-display text-5xl md:text-6xl font-light gold-shimmer-text mb-3">
                    {stat.value}
                  </div>
                  <p className="font-body text-off-white/70 leading-relaxed max-w-56 mx-auto">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="pathways-cta text-center max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-light text-green-deep mb-8 tracking-tight leading-[1.1]">
            Every skill is a seed. <br />
            <span className="gold-shimmer-text">Sha&apos;oor is the soil.</span>
          </h2>
          <p className="font-body text-xl text-charcoal-soft max-w-2xl mx-auto mb-12 leading-relaxed">
            Whether you are an institution, a donor, or a student — there is a
            place for you on this pathway.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contribute"
              className="font-body bg-green-deep text-off-white px-10 py-5 rounded-full font-medium text-lg hover:bg-gold-rich hover:text-green-deep transition-all hover:-translate-y-1 flex items-center gap-3"
            >
              Support this programme
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="font-body border border-gold-rich/40 text-green-deep px-10 py-5 rounded-full font-medium text-lg hover:border-gold-rich transition-all hover:-translate-y-1"
            >
              Partner with us
            </Link>
            <Link
              href="/partners/hunar"
              className="font-body text-gold-deep underline underline-offset-8 decoration-gold-rich decoration-2 px-10 py-5 rounded-full font-medium text-lg hover:text-green-deep transition-colors"
            >
              Learn about Hunar Foundation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
