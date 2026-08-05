"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  HandCoins,
  Users,
  GraduationCap,
  Sparkles,
  MapPin,
  ArrowRight,
  Compass,
  BookOpen,
  HeartHandshake,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import AyahBlock from "@/components/home/AyahBlock";
import { gsap } from "@/lib/gsap";

const FIELDS = [
  {
    title: "Elevated Pathways",
    desc: "The sha'oor layer over vocational training — awareness, confidence, and life readiness that convert a skill into a livelihood.",
    icon: BookOpen,
    href: "/elevated-pathways",
  },
  {
    title: "Home & Family Care Pathways",
    desc: "Dignified livelihoods in home care, early childhood support, and family services — strengthening families from the inside out.",
    icon: HeartHandshake,
    href: "/home-family-care",
  },
  {
    title: "Qarz-e-Hasna — University Opportunity",
    desc: "Interest-free, trust-based support for university students whose capability has already been proven.",
    icon: HandCoins,
    href: "/qarz-e-hasna",
  },
  {
    title: "The Better Question — Compass Fellowship",
    desc: "A formation-focused fellowship helping young people discover what they are serving, and why it matters.",
    icon: Compass,
    href: "/partners/cef",
  },
  {
    title: "ACE Foundational Curriculum Architecture",
    desc: "Character education built into foundational curriculum — becoming as well as learning.",
    icon: Sparkles,
    href: "/partners/cef",
  },
];

const VALUES = [
  {
    internal: "Amanah",
    public: "Stewardship and responsibility",
    desc: "What is entrusted to us is held with care — from every contribution to every student's journey.",
  },
  {
    internal: "Qibla",
    public: "Purpose; knowing what you are serving",
    desc: "Direction before momentum. A young person who knows what they serve can navigate anything.",
  },
  {
    internal: "Tarbiyah",
    public: "Character; becoming as well as learning",
    desc: "Skills open doors; character decides what happens on the other side.",
  },
  {
    internal: "Barakah",
    public: "Multiplying impact",
    desc: "A single seed, returned and regrown — today's beneficiary becomes tomorrow's contributor.",
  },
];

const PROGRAMS = [
  {
    title: "Interest-free loans",
    desc: "Habbah offers Qarz-e-Hasanah to students pursuing undergraduate degree programmes on need-cum-merit basis. The programme covers up to 70% of tuition fees in reputable educational institutions across Pakistan.",
    icon: HandCoins,
  },
  {
    title: "Convenient Repayments",
    desc: "Students are encouraged to begin repaying a nominal amount while pursuing their studies. Their contributions are used for helping other students, realizing the true purpose: 'Today's Beneficiary... Tomorrow's Contributor'.",
    icon: Clock,
  },
  {
    title: "Scholarship Programme",
    desc: "Promoting educational access for underprivileged backgrounds entirely on need basis through a specialized Zakat Fund. Catered specifically for students pursuing Higher Secondary School certifications.",
    icon: GraduationCap,
  },
  {
    title: "Mentorship Programme",
    desc: "Collaborating with corporate institutions and experienced professionals to provide mentorship. Focusing on quarterly sessions for educational, skill-building and career counselling to build networks.",
    icon: Users,
  },
];

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".mandate-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mandate-reveal", start: "top 85%" },
      });

      gsap.from(".impact-text", {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".impact-text", start: "top 80%" },
      });
      gsap.from(".impact-photo", {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".impact-photo", start: "top 80%" },
      });

      gsap.from(".club-photo", {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".club-photo", start: "top 80%" },
      });
      gsap.from(".club-text", {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".club-text", start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".field-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".program-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".value-row").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          delay: i * 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Learn Our Story"
        title="About"
        accent="Habbah"
        subtitle="Habbah cultivates educational and human-development pathways — helping young people grow in capability, access opportunity, and contribute to a thriving Pakistan."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Students collaborating"
      />

      <AyahBlock />

      {/* Mandate */}
      <section className="container mx-auto px-4">
        <div className="mandate-reveal glass-brand-dark rounded-[4rem] p-12 md:p-20 text-center text-off-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-125 h-125 bg-gold-rich/10 rounded-full -mr-64 -mt-64 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-green-rich/40 rounded-full -ml-48 -mb-48 blur-[80px]" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-block px-6 py-2 rounded-full bg-off-white/5 border border-gold-rich/20 text-gold-rich text-sm font-medium uppercase tracking-[0.3em] mb-10">
              Our Mandate
            </div>
            <p className="font-display text-3xl md:text-5xl font-light leading-[1.25]">
              To cultivate educational and human-development pathways that enable
              young people to grow in <span className="gold-shimmer-text">capability</span>,
              access <span className="gold-shimmer-text">opportunity</span>, discover{" "}
              <span className="gold-shimmer-text">direction</span>, and contribute
              meaningfully to a vibrant and thriving Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* The Impact Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="impact-text space-y-8">
            <SectionHeader title="The Impact" center={false} />
            <p className="font-body text-xl md:text-2xl text-charcoal-soft leading-relaxed">
              Since inception in the year 2012, Habbah has supported over{" "}
              <span className="text-green-deep font-medium underline decoration-gold-rich decoration-4 underline-offset-8">
                120 students
              </span>{" "}
              in pursuing their dream qualifications in various reputable educational institutions across Pakistan.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="p-8 bg-cream-warm rounded-3xl border-b-4 border-gold-rich shadow-xl">
                <h4 className="font-display text-4xl font-medium text-green-deep mb-2">120+</h4>
                <p className="font-body text-gold-deep font-medium uppercase text-xs tracking-widest">Success Stories</p>
              </div>
              <div className="p-8 bg-cream-warm rounded-3xl border-b-4 border-green-mid shadow-xl">
                <h4 className="font-display text-4xl font-medium text-green-deep mb-2">2012</h4>
                <p className="font-body text-gold-deep font-medium uppercase text-xs tracking-widest">Established</p>
              </div>
            </div>
          </div>

          <div className="impact-photo relative group">
            <div className="absolute -inset-4 border-2 border-dashed border-gold-rich/30 rounded-[4.5rem] -rotate-3 group-hover:rotate-0 transition-transform duration-700" />
            <div className="absolute -inset-4 border-2 border-dashed border-gold-rich/20 rounded-[4.5rem] rotate-3 group-hover:rotate-0 transition-transform duration-700" />

            <div className="relative h-150 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-off-white bg-off-white group">
              <Image
                src="/unnamed (8).jpg"
                alt="Habbah Members Meetup 2018"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass-brand p-8 rounded-3xl border-l-4 border-gold-rich shadow-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-display font-medium text-2xl text-green-deep mb-1">Members&apos; Meetup</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold-deep" />
                        <p className="font-body text-gold-deep font-medium uppercase tracking-widest text-[10px]">Karachi, Pakistan — 2018</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-deep text-gold-rich rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-rich rounded-full flex items-center justify-center shadow-xl border-4 border-off-white rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <p className="font-body text-green-deep font-medium text-[10px] text-center leading-tight uppercase">Legacy<br />Since 2012</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Habbah Club Section */}
      <section className="bg-cream-warm py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="club-photo relative h-125 rounded-[3rem] overflow-hidden border-8 border-off-white shadow-2xl order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Supportive ecosystem"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-green-deep/20" />
            </div>

            <div className="club-text space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <h4 className="font-body text-gold-deep font-medium uppercase tracking-[0.3em] text-sm">A Vibrant Community</h4>
                <h2 className="font-display text-5xl md:text-7xl font-light text-green-deep tracking-tight leading-[0.9]">
                  The Habbah <span className="gold-shimmer-text">Club</span>
                </h2>
              </div>
              <p className="font-body text-xl text-charcoal-soft leading-relaxed">
                Habbah functions amidst the growing need for a supportive ecosystem that paves the way for better access to higher education prospects for students. Our student members come from various backgrounds – each with their unique challenges, intents, and aspirations.
              </p>

              <div className="glass-brand p-8 rounded-3xl border-l-8 border-gold-rich shadow-xl">
                <h3 className="font-display text-2xl font-medium text-green-deep mb-4 flex items-center gap-3">
                  <Sparkles className="text-gold-rich w-8 h-8" />
                  Today&apos;s Beneficiary... Tomorrow&apos;s Contributor
                </h3>
                <p className="font-body text-charcoal-soft leading-relaxed">
                  Student members benefit from strong communal support through the Habbah Club – a platform that brings together Habbah alumni and aspiring members to interact, share resources, and provide career guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-150 h-150 bg-gold-rich/10 rounded-full blur-[120px]" />
      </section>

      {/* Fields of Work */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="Our Fields of Work"
          subtitle="More than one kind of support — pathways across education, skills, character, and care."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {FIELDS.map((field, idx) => (
            <GlassCard
              key={idx}
              animateOnScroll={false}
              className="field-card p-8 flex flex-col hover:border-gold-rich transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-green-deep text-gold-rich rounded-2xl shadow-xl group-hover:rotate-6 transition-transform">
                  <field.icon className="w-7 h-7" />
                </div>
                <span className="font-display text-4xl font-light text-gold-rich/20">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl font-medium text-green-deep mb-3">
                {field.title}
              </h3>
              <p className="font-body text-charcoal-soft leading-relaxed mb-6">
                {field.desc}
              </p>
              <Link
                href={field.href}
                className="mt-auto inline-flex items-center gap-2 font-body font-medium text-green-deep uppercase tracking-widest text-sm group/btn"
              >
                Learn more
                <ArrowRight className="w-4 h-4 text-gold-deep group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </GlassCard>
          ))}

          {/* Fill card linking to partners overview */}
          <GlassCard
            animateOnScroll={false}
            className="field-card p-8 flex flex-col bg-cream-warm border-dashed border-gold-rich/30 hover:border-gold-rich transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-gold-rich text-green-deep rounded-2xl shadow-xl group-hover:rotate-6 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <span className="font-display text-4xl font-light text-gold-rich/20">
                06
              </span>
            </div>
            <h3 className="font-display text-2xl font-medium text-green-deep mb-3">
              The Partners Behind the Pathways
            </h3>
            <p className="font-body text-charcoal-soft leading-relaxed mb-6">
              Idara Al Khair, Hunar Foundation, Generations School, and CEF —
              the institutions who share this field with us.
            </p>
            <Link
              href="/partners"
              className="mt-auto inline-flex items-center gap-2 font-body font-medium text-green-deep uppercase tracking-widest text-sm group/btn"
            >
              Meet our partners
              <ArrowRight className="w-4 h-4 text-gold-deep group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Programs Detailed Grid */}
      <section id="programs" className="container mx-auto px-4 scroll-mt-24">
        <SectionHeader
          title="Programme Support"
          subtitle="Comprehensive support systems designed for student success."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {PROGRAMS.map((program, idx) => (
            <GlassCard
              key={idx}
              animateOnScroll={false}
              className="program-card p-10 group hover:bg-off-white transition-all duration-500 border-b-8 border-transparent hover:border-gold-rich"
            >
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-start">
                  <div className="p-5 bg-green-deep rounded-3xl text-gold-rich shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <program.icon className="w-8 h-8" />
                  </div>
                  <div className="font-display text-5xl font-light text-cream-warm group-hover:text-gold-rich/20 transition-colors duration-500">
                    0{idx + 1}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-3xl font-medium text-green-deep tracking-tight group-hover:text-gold-deep transition-colors">{program.title}</h3>
                  <p className="font-body text-charcoal-soft text-lg leading-relaxed">
                    {program.desc}
                  </p>
                </div>

                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  <span className="font-body text-sm font-medium text-green-deep uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    Support Our Mission
                    <div className="w-8 h-px bg-green-deep transition-all group-hover:w-12" />
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-warm py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-gold-rich/10 rounded-full -mr-80 -mt-80 blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="What We Hold Dear"
            subtitle="Internal values, in the public language of everyday trust."
          />

          <div className="max-w-5xl mx-auto mt-16 space-y-6">
            {VALUES.map((value, idx) => (
              <div
                key={idx}
                className="value-row grid grid-cols-1 lg:grid-cols-3 gap-6 items-center bg-off-white rounded-[2rem] p-8 md:p-10 shadow-xl border-b-4 border-gold-rich"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-deep text-gold-rich flex items-center justify-center shrink-0 font-display text-xl font-medium">
                    {value.internal.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-green-deep">
                      {value.internal}
                    </h3>
                    <p className="font-body text-gold-deep font-medium uppercase tracking-widest text-xs mt-1">
                      Internal value
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-body text-lg text-green-deep font-medium leading-relaxed">
                    {value.public}
                  </p>
                </div>
                <p className="font-body text-charcoal-soft leading-relaxed lg:border-l lg:border-gold-rich/20 lg:pl-6">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
