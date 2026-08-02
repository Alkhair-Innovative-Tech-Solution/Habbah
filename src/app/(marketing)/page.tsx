"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HandCoins,
  ArrowRight,
  MapPin,
  GraduationCap,
  UserRoundCheck,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import Hero from "@/components/home/Hero";
import { gsap } from "@/lib/gsap";

const WHY_CHOOSE = [
  {
    title: "Convenient Repayment",
    desc: "Interest-free loans with flexible repayment plans tailored to your financial situation.",
    icon: HandCoins,
    img: "/unnamed (1).jpg",
  },
  {
    title: "Tailored Loan Programmes",
    desc: "Specialized financial support for various undergraduate degrees in top universities.",
    icon: GraduationCap,
    img: "/unnamed (2).jpg",
  },
  {
    title: "Guidance & Counselling",
    desc: "Professional mentorship and career advice to help you navigate your educational journey.",
    icon: UserRoundCheck,
    img: "/unnamed.jpg",
  },
];

const TEAM = [
  { name: "Shoaib Siddiqui", role: "Founder / Chairman", img: "/unnamed (1).png" },
  { name: "Khurram Humayun", role: "General Manager", img: "/unnamed (4).jpg" },
  { name: "Sumaira Ali", role: "Coordinator / Head of Counselling", img: "/unnamed (5).jpg" },
];

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".why-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".team-member", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
      });

      gsap.from(".impact-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".impact-reveal", start: "top 85%" },
      });

      gsap.from(".reach-image", {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reach-grid", start: "top 80%" },
      });
      gsap.from(".reach-map", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reach-grid", start: "top 80%" },
      });

      gsap.from(".cta-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-reveal", start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <Hero />

      {/*
        NOTE: copy below is unchanged per the visual-only redesign scope —
        it still frames Habbah as loan-only (Field C of five), not the whole
        trust. Content rewrite is a separate, deliberate follow-up.
      */}

      {/* Why Choose Habbah */}
      <section id="explore" className="container mx-auto px-4 scroll-mt-24">
        <SectionHeader
          title="Why choose Habbah"
          subtitle="Discover how we support students in achieving their academic dreams through a sustainable and trust-based model."
        />

        <div className="why-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {WHY_CHOOSE.map((item, idx) => (
            <GlassCard
              key={idx}
              animateOnScroll={false}
              className="why-card group overflow-hidden"
            >
              <div className="relative h-78 -mx-8 -mt-8 mb-6 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-green-deep/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 right-4 p-3 bg-off-white/90 backdrop-blur rounded-2xl shadow-lg">
                  <item.icon className="w-6 h-6 text-green-deep" />
                </div>
              </div>
              <h3 className="font-display text-2xl font-medium text-green-deep mb-4">{item.title}</h3>
              <p className="font-body text-charcoal-soft leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-cream-warm py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-gold-rich/10 rounded-full -mr-80 -mt-80 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-green-mid/5 rounded-full -ml-64 -mb-64 blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="The Habbah Team"
            subtitle="Meet the dedicated individuals working behind the scenes to empower the next generation."
          />

          <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
            {TEAM.map((person, idx) => (
              <div key={idx} className="team-member text-center group">
                <div className="relative w-72 h-72 lg:w-80 lg:h-80 mx-auto mb-10 rounded-full p-2 border-2 border-dashed border-gold-rich/30 group-hover:border-gold-rich transition-all duration-700">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-off-white shadow-[0_20px_50px_rgba(26,53,40,0.1)] group-hover:shadow-gold-rich/20 group-hover:scale-[1.05] transition-all duration-500">
                    <Image
                      src={person.img}
                      alt={person.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gold-rich/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
                <h3 className="font-display text-3xl font-medium text-green-deep mb-2 group-hover:text-gold-deep transition-colors">{person.name}</h3>
                <p className="font-body text-gold-deep font-medium uppercase tracking-widest text-sm">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Impact Section */}
      <section className="container mx-auto px-4">
        <SectionHeader title="Empowering Future Leaders through Education" />
        <div className="impact-reveal relative h-100 md:h-150 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_30px_60px_rgba(26,53,40,0.15)] border-8 border-off-white mt-12 group">
          <Image
            src="/unnamed (8).jpg"
            alt="Students collaborating"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-green-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </section>

      {/* How to reach us */}
      <section className="container mx-auto px-4 pb-24">
        <SectionHeader
          title="How to reach us"
          subtitle="All interactions with Habbah members and associates are carried out from Habbah's office based in Generation's School's South Campus, SITE, Karachi."
        />

        <div className="reach-grid grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* Left Column: Stacked Images */}
          <div className="flex flex-col gap-6 h-full">
            <div className="reach-image relative flex-1 min-h-87.5 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-off-white group">
              <Image
                src="/unnamed (6).jpg"
                alt="Student collaboration"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-green-deep/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="reach-image relative flex-1 min-h-87.5 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-off-white group">
              <Image
                src="/unnamed (7).jpg"
                alt="Empowering students"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-green-deep/10 group-hover:bg-transparent transition-colors" />
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="reach-map h-137.5 lg:h-full min-h-137.5 rounded-[3.5rem] overflow-hidden shadow-2xl relative border-8 border-off-white group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.202302324915!2d67.005328!3d24.902718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f9015555555%3A0x8b3e3e3e3e3e3e3e!2sGeneration's+School!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>

            {/* Map Overlay Card */}
            <div className="absolute bottom-8 left-8 right-8 glass-brand p-8 rounded-3xl shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold-rich rounded-2xl text-green-deep shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-medium text-green-deep mb-1">Visit Our Office</h4>
                  <p className="font-body text-charcoal-soft leading-relaxed">
                    Generation's School South Campus,<br />
                    SITE, Karachi, Pakistan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="cta-reveal glass-brand-dark rounded-[4rem] p-16 md:p-24 text-center text-off-white relative overflow-hidden group">
          {/* Decorative background highlights */}
          <div className="absolute top-0 right-0 w-125 h-125 bg-gold-rich/10 rounded-full -mr-64 -mt-64 blur-[100px] group-hover:bg-gold-rich/20 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-green-rich/50 rounded-full -ml-48 -mb-48 blur-[80px]" />

          <div className="relative z-10">
            <div className="inline-block px-6 py-2 rounded-full bg-off-white/5 border border-gold-rich/20 text-gold-rich text-sm font-medium uppercase tracking-[0.3em] mb-8">
              Ready to begin?
            </div>

            <h2 className="font-display text-5xl md:text-7xl font-light mb-10 leading-[1.1] tracking-tight">
              Transform Your <span className="gold-shimmer-text">Tomorrow.</span> <br className="hidden md:block" />
              Apply Today.
            </h2>

            <p className="font-body text-xl md:text-2xl text-off-white/60 max-w-3xl mx-auto mb-14 leading-relaxed">
              Take the first step towards a successful career. Our application process is designed to find and support the most promising students.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="font-body bg-gold-rich hover:bg-off-white text-green-deep px-12 py-6 rounded-full font-medium text-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 group/btn"
              >
                Start Your Application
                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
