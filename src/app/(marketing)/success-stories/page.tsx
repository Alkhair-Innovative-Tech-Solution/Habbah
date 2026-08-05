"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote, GraduationCap, Sprout, HeartHandshake, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import PageHero from "@/components/PageHero";
import { gsap } from "@/lib/gsap";

const stories = [
  {
    name: "Nur us Sabah Pirvani",
    story: "I come from a humble background. My father was a van driver, so it was a challenge to meet my educational expenses after my intermediate. My brother, working at Generation's School, introduced me to Habbah. After due diligence, Habbah supported me not only financially, but guided me throughout, mentoring me personally as well as in my career as a marketing executive, and that has made me what I am today. Habbah sown a seed and it grew out to be me!",
    img: "/unnamed (12).jpg",
  },
  {
    name: "Kanwal Sheraz",
    story: "I was in my first year of medical college at KMDC when I lost my father. He was the only earning member in the family, so I had to start giving tuition to support my education, which affected my studies as it would take up to 5-6 hours every day. My uncle introduced me to the Qarz-e-Hasanah program of Habbah Educational Trust, which I availed. Now I can concentrate on my education stress-free. Habbah has inspired me a lot, I realize that I need to help others like Habbah has helped me today.",
    img: "/unnamed (13).jpg",
  },
  {
    name: "Ayesha Saeed",
    story: "My family was going through financial problems at the time of my high school admissions. They suggested that given the financial situation, I should opt for intermediate instead of A levels. I wasn't happy as I knew my potential so I decided to apply for financial assistance at Habbah. I was lucky enough to get accepted at Habbah. I did my A levels from St. Patrick's School. After completing my A Levels, I visited Habbah, they encouraged me to pursue professional education, it was then I opted for engineering from NED University. I passed with distinction and was offered a lectureship. I am very happy to say that I was able to repay the complete Qarz-e-Hashanah within two years.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Muhammad Sajid",
    story: "My father was a peon, and after completing my intermediate I was evaluating higher education options, suddenly my father passed away, and I faced severe financial problems. I applied to Habbah and was successful in securing financial assistance. Habbah not only provided me with financial support but also inspired me to do ACCA, which under normal circumstances I would have never pursued. After completing of ACCA qualification, I joined a local bank as an ACCA trainee, today I am working there as a manager of SBU and leading a team of two staff members. I am thankful to Habbah for their support throughout my education process.",
    img: "/unnamed (10).jpg",
  },
  {
    name: "Ahmed Mujtaba",
    story: "I am convinced that with support, guidance and counselling, we can help students realize that they can achieve what they believe in, as I did in my formative years. Habbah provides more than just money; they provide a vision and a path to success.",
    img: "/unnamed (11).jpg",
  },
  {
    name: "Tehreem Muzammil",
    story: "Many students are not aware of the possibilities in higher education. I know this for a fact as I too struggled to find the right option for my undergraduate programme. I am excited to be a mentor to many fresh college entrants in choosing the relevant field of education for their future.",
    img: "/unnamed (14).jpg",
  },
];

const CATEGORIES = [
  { label: "All Stories", icon: Sprout },
  { label: "Student Stories", icon: GraduationCap },
  { label: "Trainee Stories", icon: Sprout },
  { label: "Family Impact", icon: HeartHandshake },
  { label: "Alumni", icon: MapPin },
];

const UPCOMING = [
  {
    icon: GraduationCap,
    title: "Trainee Stories",
    desc: "Voices from Elevated Pathways — the sha'oor that turned a skill into a livelihood. Stories arriving with our first graduating cohorts.",
  },
  {
    icon: HeartHandshake,
    title: "Family Impact",
    desc: "When a young person grows, a family grows with them. These are the stories of households changed from the inside out.",
  },
  {
    icon: MapPin,
    title: "Alumni — Where Are They Now?",
    desc: "From Habbah Club member to mentor, contributor, and builder. Following the journeys of those who grew the tree onward.",
  },
];

export default function SuccessStories() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All Stories");

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".intro-card", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".intro-card", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".story-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          delay: (i % 3) * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".category-pill").forEach((el, i) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          delay: i * 0.06,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".categories-bar", start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".upcoming-card").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          delay: i * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".wall-of-fame", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wall-of-fame", start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const visibleStories =
    activeCategory === "All Stories" || activeCategory === "Student Stories"
      ? stories
      : [];

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Real Growth, Real Lives"
        title="Stories of"
        accent="Growth"
        subtitle="Growth looks different for everyone — a first job, a repaid trust, a family changed. These are the journeys of the Habbah community."
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Graduation success"
      />

      {/* Intro Description */}
      <section className="intro-card container mx-auto px-4 -mt-10 relative z-30">
        <div className="glass-brand p-12 md:p-16 rounded-[4rem] shadow-2xl text-center max-w-5xl mx-auto">
          <SectionHeader
            title="Growth, Not Just Success"
            subtitle="More than a loan story — a community that grows together."
          />
          <p className="font-body text-xl md:text-2xl text-charcoal-soft leading-relaxed mt-8 italic">
            &ldquo;These are stories of growth — of university students, vocational
            trainees, families, and alumni. Every story is a seed that became a
            tree, and every tree becomes soil for the next generation. We celebrate
            the capability these young people always carried, and the trust that
            helped it take root.&rdquo;
          </p>
          <div className="w-24 h-1 bg-gold-rich mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Category Pills */}
      <section className="container mx-auto px-4 -mt-16 relative z-30">
        <div className="categories-bar flex flex-wrap justify-center gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.label}
              onClick={() => setActiveCategory(category.label)}
              className={`category-pill flex items-center gap-2 px-6 py-3 rounded-full font-body font-medium transition-all ${
                activeCategory === category.label
                  ? "bg-green-deep text-off-white shadow-xl"
                  : "bg-cream-warm text-charcoal-soft hover:bg-off-white hover:border-gold-rich/40 border border-gold-rich/15"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        {visibleStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleStories.map((person, idx) => (
              <GlassCard
                key={idx}
                animateOnScroll={false}
                className="story-card flex flex-col h-full group"
              >
                <div className="relative h-64 -mx-8 -mt-8 mb-8 overflow-hidden">
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-green-deep/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block mb-2 px-3 py-1 rounded-full bg-off-white/90 text-green-deep font-body text-[10px] font-medium uppercase tracking-widest">
                      Student story
                    </span>
                    <h3 className="font-display text-2xl font-medium text-off-white">{person.name}</h3>
                    <div className="h-1 w-12 bg-gold-rich mt-2 rounded-full" />
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-4 -left-2 w-12 h-12 text-gold-rich/10 -z-10" />
                  <p className="font-body text-charcoal-soft leading-relaxed italic mb-6">
                    &ldquo;{person.story}&rdquo;
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-xl text-charcoal-soft">
              Stories from this part of the community are being gathered.
            </p>
            <p className="font-body text-charcoal-soft/70 mt-2">
              If you have one to share, we would love to hear it.
            </p>
          </div>
        )}
      </section>

      {/* Upcoming Story Categories */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="More Stories Growing"
          subtitle="Stories we are gathering from across the community."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UPCOMING.map((item, idx) => (
            <div
              key={idx}
              className="upcoming-card p-8 bg-cream-warm rounded-[2rem] border border-gold-rich/20 hover:border-gold-rich transition-colors flex flex-col"
            >
              <div className="p-4 bg-green-deep text-gold-rich rounded-2xl w-fit mb-6">
                <item.icon className="w-7 h-7" />
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
      </section>

      {/* Stats or Callout */}
      <section className="container mx-auto px-4 py-12">
        <div className="wall-of-fame bg-cream-warm rounded-[3rem] p-12 text-center border border-gold-rich/20">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-green-deep mb-6">
            Grow With Us
          </h2>
          <p className="font-body text-lg text-charcoal-soft max-w-2xl mx-auto mb-8">
            Your story could be the next seed. Apply now and start your journey
            with Habbah — or share a story of someone whose growth you have witnessed.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/qarz-e-hasna"
              className="inline-block font-body bg-green-deep text-off-white px-8 py-4 rounded-full font-medium hover:bg-gold-rich hover:text-green-deep transition-all hover:-translate-y-0.5"
            >
              Apply to Habbah
            </Link>
            <Link
              href="/contact"
              className="inline-block font-body border border-gold-rich/40 text-green-deep px-8 py-4 rounded-full font-medium hover:border-gold-rich transition-all hover:-translate-y-0.5"
            >
              Share a Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
