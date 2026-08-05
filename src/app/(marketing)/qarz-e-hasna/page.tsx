"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Users,
  Search,
  UserPlus,
  CheckCircle,
  ArrowRight,
  HandCoins,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import { gsap } from "@/lib/gsap";

const steps = [
  {
    step: "01",
    title: "The Application Form",
    desc: "Fill out the online form to receive your application pack. Ensure you have all necessary academic and financial documents ready for submission.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Interview",
    desc: "Deserving candidates are invited for a personal interview with our Student Counsellor and Program Coordinator to discuss their aspirations.",
    icon: Users,
  },
  {
    step: "03",
    title: "Assessment",
    desc: "Our committee reviews each case based on financial need and academic merit to determine the appropriate support tier.",
    icon: Search,
  },
  {
    step: "04",
    title: "Membership Offer",
    desc: "Successful applicants receive a formal membership offer, including the approved support amount and a clear, interest-free repayment schedule.",
    icon: UserPlus,
  },
  {
    step: "05",
    title: "Acceptance",
    desc: "Upon signing the agreement, you officially become a member of the Habbah Club and receive your first disbursement.",
    icon: CheckCircle,
  },
];

const STATS = [
  { value: "2012", label: "Supporting students since" },
  { value: "~300", label: "Students supported in total" },
  { value: "~150", label: "Currently active" },
  { value: "PK-wide", label: "Leading universities across Pakistan" },
];

const INFO = [
  {
    title: "Eligibility",
    text: "Applicants must be enrolled in or have an admission offer from a recognized university for an undergraduate degree programme.",
  },
  {
    title: "Documents Required",
    text: "CNIC, Academic transcripts (SSC, HSC), University Admission Letter, and Proof of Household Income.",
  },
  {
    title: "Processing Time",
    text: "The entire process from application to disbursement typically takes 4-6 weeks depending on interview availability.",
  },
  {
    title: "Repayment Terms",
    text: "Repayments are interest-free — Qarz-e-Hasna means a beautiful loan — and start 6 months after graduation or upon securing employment, whichever is earlier.",
  },
];

export default function QarzHasna() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        });
      }

      gsap.from(".qeh-intro", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".qeh-intro", start: "top 85%" },
      });

      gsap.from(".stat-card", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats-grid", start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".step-item").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      gsap.from(".process-cta", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-cta", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".info-card").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          delay: (i % 2) * 0.08,
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
        eyebrow="Our Work — University Support"
        title="Qarz-e-Hasna"
        accent="University Opportunity"
        subtitle="A beautiful loan — with no interest, no pressure, and no barrier between talent and its future."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop"
        imageAlt="University students collaborating"
      />

      {/* Arabic Name Badge */}
      <section className="container mx-auto px-4 -mt-12 relative z-30">
        <div className="qeh-intro glass-brand max-w-3xl mx-auto rounded-[2.5rem] px-10 py-8 shadow-xl text-center">
          <p className="font-arabic text-4xl md:text-5xl text-green-deep mb-4" dir="rtl" lang="ar">
            قرض حسنة
          </p>
          <p className="font-body text-lg text-charcoal-soft leading-relaxed">
            Qarz-e-Hasna — literally, <span className="text-green-deep font-medium">a beautiful loan</span> —
            is Habbah&apos;s interest-free support for university students.
          </p>
        </div>
      </section>

      {/* What is Qarz-e-Hasna */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <SectionHeader title="Trust, Given Back" center={false} />
            <p className="font-body text-xl md:text-2xl text-charcoal-soft leading-relaxed">
              Since 2012, we have supported approximately{" "}
              <span className="text-green-deep font-medium underline decoration-gold-rich decoration-4 underline-offset-8">
                300 students
              </span>
              — with around 150 currently active across leading universities in
              Pakistan.
            </p>
            <p className="font-body text-lg text-charcoal-soft leading-relaxed">
              This is not charity. It is trust — given to those whose capability
              has already been proven, and whose circumstances should not decide
              their future.
            </p>
            <div className="glass-brand p-8 rounded-3xl border-l-8 border-gold-rich shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <HandCoins className="w-8 h-8 text-gold-deep" />
                <h3 className="font-display text-2xl font-medium text-green-deep">
                  Today&apos;s Beneficiary... Tomorrow&apos;s Contributor
                </h3>
              </div>
              <p className="font-body text-charcoal-soft leading-relaxed">
                When students begin repaying, their contributions are used to help
                the next student — so a single seed grows into a tree of opportunity.
              </p>
            </div>
          </div>

          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 gap-8">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="stat-card bg-cream-warm rounded-[2rem] p-10 text-center border-b-4 border-gold-rich shadow-xl"
              >
                <div className="font-display text-5xl font-medium text-green-deep mb-3">
                  {stat.value}
                </div>
                <p className="font-body text-gold-deep font-medium uppercase tracking-widest text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="How It Works"
          subtitle="A transparent journey from application to membership — built on trust, not pressure."
        />

        <div ref={timelineRef} className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gold-rich/15 transform -translate-x-1/2" />
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gold-rich transform -translate-x-1/2"
          />

          <div className="space-y-24">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`step-item flex flex-col lg:flex-row items-center gap-12 ${
                  idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="flex-1 w-full">
                  <GlassCard className="p-10 hover:border-gold-rich transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-display text-6xl font-light text-gold-rich/30 leading-none">
                        {step.step}
                      </span>
                      <h3 className="font-display text-3xl font-medium text-green-deep">{step.title}</h3>
                    </div>
                    <p className="font-body text-charcoal-soft text-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </GlassCard>
                </div>

                <div className="relative z-10 w-20 h-20 bg-green-deep rounded-3xl flex items-center justify-center shadow-2xl border-4 border-off-white shrink-0">
                  <step.icon className="w-10 h-10 text-gold-rich" />
                </div>

                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4">
        <div className="process-cta glass-brand-dark rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-100 h-100 bg-gold-rich/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-green-rich/40 rounded-full -ml-48 -mb-48 blur-[80px]" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-light text-off-white mb-6">
              Ready to Begin?
            </h2>
            <p className="font-body text-xl text-off-white/70 max-w-2xl mx-auto mb-10">
              Don&apos;t let circumstances decide your future. Apply today and
              join a community of scholars and mentors.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-body bg-gold-rich text-green-deep px-10 py-5 rounded-full font-medium text-xl hover:bg-off-white transition-all hover:-translate-y-1"
            >
              Apply for Qarz-e-Hasna
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Important Info + Stories */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="Important Information"
          subtitle="Please read these details carefully before starting your application."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {INFO.map((item, idx) => (
            <div
              key={idx}
              className="info-card flex gap-4 p-6 bg-cream-warm border border-gold-rich/15 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckCircle className="w-6 h-6 text-gold-deep shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-medium text-green-deep text-lg mb-2">{item.title}</h4>
                <p className="font-body text-charcoal-soft">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="info-card mt-12 glass-brand rounded-[2.5rem] p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-green-deep text-gold-rich rounded-3xl shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-green-deep mb-2">
                Meet the students behind the numbers
              </h3>
              <p className="font-body text-charcoal-soft leading-relaxed">
                Read stories of capability, courage, and repayment — and the
                mentors who walked alongside.
              </p>
            </div>
          </div>
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-3 font-body bg-green-deep text-off-white px-8 py-4 rounded-full font-medium hover:bg-gold-rich hover:text-green-deep transition-all hover:-translate-y-0.5 shrink-0"
          >
            <BookOpen className="w-5 h-5" />
            Student Stories
          </Link>
        </div>
      </section>
    </div>
  );
}
