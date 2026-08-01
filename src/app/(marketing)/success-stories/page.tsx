"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
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

export default function SuccessStories() {
  const rootRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Real Impact, Real Lives"
        title="Stories of"
        accent="Impact"
        subtitle="Meet the brilliant minds who transformed their lives with the support of Habbah."
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Graduation success"
      />

      {/* Intro Description */}
      <section className="intro-card container mx-auto px-4 -mt-10 relative z-30">
        <div className="glass-brand p-12 md:p-16 rounded-[4rem] shadow-2xl text-center max-w-5xl mx-auto">
          <SectionHeader
            title="Celebrating Excellence"
            subtitle="The remarkable journeys of our student members."
          />
          <p className="font-body text-xl md:text-2xl text-charcoal-soft leading-relaxed mt-8 italic">
            "Welcome to our Student Success Stories section, where we celebrate the remarkable journeys of our students who have achieved their dreams with the support of our interest-free loan program. These inspiring testimonials highlight the transformative power of education and the impact of financial support in overcoming challenges. Join us in applauding their dedication, perseverance, and the positive change they are making in their communities and beyond."
          </p>
          <div className="w-24 h-1 bg-gold-rich mx-auto mt-8 rounded-full" />
        </div>
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((person, idx) => (
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
                  <h3 className="font-display text-2xl font-medium text-off-white">{person.name}</h3>
                  <div className="h-1 w-12 bg-gold-rich mt-2 rounded-full" />
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-4 -left-2 w-12 h-12 text-gold-rich/10 -z-10" />
                <p className="font-body text-charcoal-soft leading-relaxed italic mb-6">
                  "{person.story}"
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Stats or Callout */}
      <section className="container mx-auto px-4 py-12">
        <div className="wall-of-fame bg-cream-warm rounded-[3rem] p-12 text-center border border-gold-rich/20">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-green-deep mb-6">Join Our Wall of Fame</h2>
          <p className="font-body text-lg text-charcoal-soft max-w-2xl mx-auto mb-8">
            Every year, we welcome new students into our family. Your story could be next. Apply now and start your journey with Habbah.
          </p>
          <Link
            href="/contact"
            className="inline-block font-body bg-green-deep text-off-white px-8 py-4 rounded-full font-medium hover:bg-gold-rich hover:text-green-deep transition-all hover:-translate-y-0.5"
          >
            Share Your Story
          </Link>
        </div>
      </section>
    </div>
  );
}
