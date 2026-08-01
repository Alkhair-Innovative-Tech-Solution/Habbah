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
    desc: "Deserving candidates will be invited for a personal interview with our Student Counsellor and Program Coordinator to discuss their aspirations.",
    icon: Users,
  },
  {
    step: "03",
    title: "Assessment",
    desc: "Our committee reviews each case based on financial need and academic merit to determine the appropriate loan tier and support level.",
    icon: Search,
  },
  {
    step: "04",
    title: "Membership Offer",
    desc: "Successful applicants receive a formal membership offer, including the approved loan amount and a clear repayment schedule.",
    icon: UserPlus,
  },
  {
    step: "05",
    title: "Acceptance",
    desc: "Upon signing the repayment agreement, you officially become a member of the Habbah Club and receive your first disbursement.",
    icon: CheckCircle,
  },
];

const INFO = [
  {
    title: "Eligibility",
    text: "Applicants must be enrolled in or have an admission offer from a recognized university for an undergraduate degree program.",
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
    text: "Repayments are interest-free and start 6 months after graduation or upon securing employment, whichever is earlier.",
  },
];

export default function ApplicationProcess() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Golden thread: draws down the timeline as the user scrolls past it.
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

      gsap.utils.toArray<HTMLElement>(".step-item").forEach((el, i) => {
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
        eyebrow="Step by Step Guide"
        title="Application"
        accent="Process"
        subtitle="Transparent and straightforward steps to becoming a Habbah Club beneficiary."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Success background"
      />

      {/* Steps Timeline */}
      <section className="container mx-auto px-4">
        <div ref={timelineRef} className="relative">
          {/* Vertical Line for Desktop */}
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
                {/* Content */}
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

                {/* Center Icon */}
                <div className="relative z-10 w-20 h-20 bg-green-deep rounded-3xl flex items-center justify-center shadow-2xl border-4 border-off-white shrink-0">
                  <step.icon className="w-10 h-10 text-gold-rich" />
                </div>

                {/* Spacer for Desktop Alignment */}
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
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-light text-off-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="font-body text-xl text-off-white/70 max-w-2xl mx-auto mb-10">
              Don't let financial obstacles hold you back. Apply today and join a community of scholars and mentors.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-body bg-gold-rich text-green-deep px-10 py-5 rounded-full font-medium text-xl hover:bg-off-white transition-all hover:-translate-y-1"
            >
              Apply for Interest-Free Loan
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs or Additional Info */}
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
      </section>
    </div>
  );
}
