"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Handshake, Users, Landmark, Building2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import PartnerLogo from "@/components/PartnerLogo";
import { gsap } from "@/lib/gsap";

const PARTNERS = [
  {
    name: "Idara Al Khair",
    href: "/partners/al-khair",
    desc: "A trusted institution serving underserved communities in Karachi — the ecosystem behind Habbah's community programmes.",
  },
  {
    name: "Hunar Foundation",
    href: "/partners/hunar",
    desc: "One of Pakistan's leading vocational training organisations, where Habbah adds the sha'oor layer to technical skills.",
  },
  {
    name: "Generations School",
    href: "/partners/generations",
    desc: "The founding home of Habbah — our office is based at Generation's School South Campus, SITE, Karachi.",
  },
  {
    name: "CEF — Character Education Foundation",
    href: "/partners/cef",
    desc: "Habbah's partner in formation-focused initiatives, with pilots planned for 2027.",
  },
];

const APPROACH = [
  {
    icon: Handshake,
    title: "Shared Dignity",
    desc: "We partner as equals — each institution brings what it does best, and the student is never a passive recipient.",
  },
  {
    icon: Users,
    title: "Community Trust",
    desc: "Programmes run inside communities that already know and trust our partners — never at a distance from them.",
  },
  {
    icon: Landmark,
    title: "Enduring Institutions",
    desc: "We build with institutions built to last, so the pathways we create outlive any single cohort.",
  },
  {
    icon: Building2,
    title: "Shared Space",
    desc: "From classrooms to campuses to community halls — our partners provide the ground where growth happens.",
  },
];

export default function Partners() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".partner-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".approach-item").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          delay: (i % 4) * 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".partners-cta", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".partners-cta", start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Our Partners"
        title="Partners in"
        accent="Growth"
        subtitle="Habbah grows through partnership — trusted institutions that bring community, skill, and space to every pathway we build."
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Community working together"
      />

      {/* Partner Cards */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="Who We Work With"
          subtitle="Four institutions, one shared purpose — young people growing in capability and contributing with dignity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {PARTNERS.map((partner, idx) => (
            <GlassCard
              key={idx}
              animateOnScroll={false}
              className="partner-card p-10 flex flex-col hover:border-gold-rich transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <PartnerLogo
                  name={partner.name}
                  className="w-20 h-20 rounded-3xl text-3xl shadow-xl"
                />
                <span className="font-display text-5xl font-light text-gold-rich/20">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="font-display text-3xl font-medium text-green-deep mb-4">
                {partner.name}
              </h3>
              <p className="font-body text-charcoal-soft leading-relaxed mb-8">
                {partner.desc}
              </p>
              <Link
                href={partner.href}
                className="mt-auto inline-flex items-center gap-2 font-body font-medium text-green-deep uppercase tracking-widest text-sm group/btn"
              >
                Meet this partner
                <ArrowRight className="w-4 h-4 text-gold-deep group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How we partner */}
      <section className="bg-cream-warm py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-gold-rich/10 rounded-full -mr-80 -mt-80 blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="How We Partner"
            subtitle="Partnership at Habbah is a relationship, not a transaction."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {APPROACH.map((item, idx) => (
              <div key={idx} className="approach-item text-center">
                <div className="w-20 h-20 mx-auto bg-green-deep text-gold-rich rounded-3xl flex items-center justify-center shadow-xl mb-6 group-hover:rotate-6 transition-transform">
                  <item.icon className="w-9 h-9" />
                </div>
                <h3 className="font-display text-2xl font-medium text-green-deep mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal-soft leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="partners-cta glass-brand-dark rounded-[3rem] p-12 md:p-16 text-center text-off-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-100 h-100 bg-gold-rich/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Share our field.
            </h2>
            <p className="font-body text-xl text-off-white/70 max-w-2xl mx-auto mb-10">
              If your institution believes in capability, opportunity, and
              long-term growth — let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-body bg-gold-rich text-green-deep px-10 py-5 rounded-full font-medium text-lg hover:bg-off-white transition-all hover:-translate-y-1"
            >
              Become a partner
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
