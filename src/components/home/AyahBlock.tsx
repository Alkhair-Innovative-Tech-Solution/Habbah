"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { AYAH, type AyahLang } from "@/lib/ayah";

type Lang = AyahLang;

export default function AyahBlock() {
  const [lang, setLang] = useState<Lang>("en");
  const sectionRef = useRef<HTMLElement>(null);
  const translationRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".ayah-reveal", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLangSwitch = (next: Lang) => {
    if (next === lang) return;
    if (!translationRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLang(next);
      return;
    }
    gsap.to(translationRef.current, {
      opacity: 0,
      y: 5,
      duration: 0.2,
      onComplete: () => {
        setLang(next);
        gsap.to(translationRef.current, { opacity: 1, y: 0, duration: 0.3 });
      },
    });
  };

  const active = AYAH.translations[lang];

  return (
    <section
      ref={sectionRef}
      id="ayah"
      className="bg-green-deep py-24 md:py-36 px-6 sm:px-10 lg:px-32 text-center"
    >
      <div className="ayah-reveal max-w-3xl mx-auto">
        <div className="h-px w-15 bg-gold-rich mx-auto mb-12" />

        <p
          className="font-arabic text-gold-pale text-[clamp(1.4rem,3vw,2.2rem)] leading-[2.2] mb-10"
          dir="rtl"
          lang="ar"
        >
          {AYAH.arabic}
        </p>

        <div
          className="inline-flex border border-gold-rich/40 mb-8 overflow-hidden"
          role="group"
          aria-label="Translation language"
        >
          {(Object.keys(AYAH.translations) as Lang[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleLangSwitch(key)}
              aria-pressed={lang === key}
              className={`font-body text-xs tracking-[0.1em] px-6 py-2 transition-colors cursor-pointer ${
                lang === key
                  ? "bg-gold-rich text-green-deep"
                  : "text-gold-pale hover:text-gold-rich"
              }`}
            >
              {AYAH.translations[key].label}
            </button>
          ))}
        </div>

        <p
          ref={translationRef}
          className={`max-w-2xl mx-auto mb-6 text-off-white/75 ${
            lang === "ur"
              ? "font-urdu text-[clamp(1rem,1.8vw,1.25rem)] leading-[2.5]"
              : "font-body italic text-[clamp(0.95rem,1.5vw,1.1rem)] leading-[2]"
          }`}
          dir={lang === "ur" ? "rtl" : "ltr"}
          lang={lang}
        >
          {active.text}
        </p>

        <span className="font-arabic text-sm text-gold-rich/80" dir="rtl">
          {AYAH.reference}
        </span>

        <div className="h-px w-15 bg-gold-rich mx-auto mt-12" />
      </div>
    </section>
  );
}
