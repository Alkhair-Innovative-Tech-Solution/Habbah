"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Clock,
  HandCoins,
  Users,
  GraduationCap,
  Sparkles,
  MapPin,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import AyahBlock from "@/components/home/AyahBlock";
import { gsap } from "@/lib/gsap";

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
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Learn Our Story"
        title="About"
        accent="Habbah"
        subtitle="Habbah Educational Trust is dedicated to assisting deserving students in Pakistan by providing financial support for their bachelor's degree programmes."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Students collaborating"
      />

      <AyahBlock />

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
                      <p className="font-display font-medium text-2xl text-green-deep mb-1">Members' Meetup</p>
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
                  Today's Beneficiary... Tomorrow's Contributor
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

      {/* Programs Detailed Grid */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="Our Programs"
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
    </div>
  );
}
