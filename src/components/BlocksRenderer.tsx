"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import SectionHeader from "./SectionHeader";
import GlassCard from "./GlassCard";

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
};

// General Style Helper
const applyStyles = (backgroundColor?: string, backgroundImage?: string, textColor?: string): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  if (backgroundColor) styles.backgroundColor = backgroundColor;
  if (backgroundImage) {
    styles.backgroundImage = `url(${backgroundImage})`;
    styles.backgroundSize = "cover";
    styles.backgroundPosition = "center";
  }
  if (textColor) styles.color = textColor;
  return styles;
};

interface BlockProps {
  blockType: string;
  [key: string]: any;
}

export default function BlocksRenderer({ sections }: { sections: BlockProps[] }) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <div className="flex flex-col gap-24 pb-24">
      {sections.map((section, idx) => {
        switch (section.blockType) {
          case "hero":
            return <HeroBlock key={idx} {...section} />;
          case "text":
            return <TextBlock key={idx} {...section} />;
          case "cards-grid":
            return <CardsGridBlock key={idx} {...section} />;
          case "stats":
            return <StatsBlock key={idx} {...section} />;
          case "testimonials":
            return <TestimonialsBlock key={idx} {...section} />;
          case "cta":
            return <CtaBlock key={idx} {...section} />;
          case "timeline":
            return <TimelineBlock key={idx} {...section} />;
          case "partners":
            return <PartnersBlock key={idx} {...section} />;
          case "team":
            return <TeamBlock key={idx} {...section} />;
          case "map-section":
            return <MapSectionBlock key={idx} {...section} />;
          case "contact-form":
            return <ContactFormBlock key={idx} {...section} />;
          case "jobs-section":
            return <JobsSectionBlock key={idx} {...section} />;
          default:
            console.warn(`Unknown block type: ${section.blockType}`);
            return null;
        }
      })}
    </div>
  );
}

// 1. HERO BLOCK
export function HeroBlock({ badge, title, subtitle, highlightWord, cta, stats, backgroundType, textColor, backgroundColor, backgroundImage }: any) {
  const isDark = backgroundType === "darkblue";
  
  const customStyles = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined
  };
  const bgImgSrc = backgroundImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop";

  // Highlight word rendering logic
  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section style={customStyles} className={`relative min-h-[95vh] flex items-center justify-center pt-20 overflow-hidden ${isDark && !backgroundColor ? "bg-darkblue" : "bg-white"}`}>
      {/* Modern Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImgSrc}
          alt="Wheat field background"
          className={`absolute inset-0 w-full h-full object-cover scale-105 ${isDark ? "brightness-[0.35]" : "brightness-95"}`}
        />
        <div className={`absolute inset-0 ${isDark ? "bg-linear-to-b from-darkblue/40 via-transparent to-white" : "bg-white/80"}`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-lightblue/10 backdrop-blur-md border border-lightblue/20 text-lightblue text-xs font-bold uppercase tracking-[0.2em] mb-8"
              style={textColor ? { color: textColor } : undefined}
            >
              {badge}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tighter ${isDark ? "text-white text-shadow-lg" : "text-darkblue"}`}
            style={textColor ? { color: textColor } : undefined}
          >
            {renderTitle()}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-semibold ${isDark ? "text-white/90 text-shadow-lg" : "text-gray-600"}`}
              style={textColor ? { color: textColor } : undefined}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {cta && cta.label && (
              <Link
                href={cta.link || "#"}
                className="bg-yellow hover:bg-white text-darkblue px-10 py-5 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_rgba(255,195,0,0.3)] hover:shadow-yellow/40 flex items-center gap-3 group hover:-translate-y-1"
              >
                {cta.label}
                <LucideIcons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <Link
              href="/about"
              className={`px-10 py-5 rounded-full font-bold text-lg transition-all ${isDark ? "glass-dark text-white border-white/20 hover:border-white/40 hover:bg-darkblue" : "glass text-darkblue border-gray-200 hover:bg-gray-50"}`}
            >
              Our Mission
            </Link>
          </motion.div>

          {/* Stats if available */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              {stats.map((stat: any, sIdx: number) => (
                <div 
                  key={sIdx} 
                  className={`p-6 rounded-2xl backdrop-blur-md border ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-darkblue/5 border-darkblue/10 text-darkblue"}`}
                  style={textColor ? { color: textColor } : undefined}
                >
                  <h4 className="text-3xl font-black">{stat.value}</h4>
                  <p className="text-sm font-semibold opacity-80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Abstract Shapes */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-lightblue/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-darkblue/5 rounded-full blur-[120px]" />
    </section>
  );
}

// 2. TEXT BLOCK
export function TextBlock({ badge, title, content, layout, background, textColor, backgroundColor, backgroundImage }: any) {
  const isCentered = layout === "centered";
  const isLightBlue = background === "lightblue";

  // Handle Lexical root structure vs Slate array structure
  let paragraphs: any[] = [];
  if (Array.isArray(content)) {
    paragraphs = content;
  } else if (content && typeof content === "object" && content.root && Array.isArray(content.root.children)) {
    paragraphs = content.root.children;
  }

  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  return (
    <section 
      style={sectionStyle} 
      className={`py-20 relative overflow-hidden ${isLightBlue && !backgroundColor ? "bg-bglightblue" : ""}`}
    >
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {(badge || title) && (
          <div className={`mb-12 ${isCentered ? "text-center" : "text-left"}`}>
            {badge && (
              <span className="text-lightblue font-black uppercase tracking-[0.2em] text-sm mb-2 block" style={textColor ? { color: textColor } : undefined}>
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-black text-darkblue tracking-tight" style={textColor ? { color: textColor } : undefined}>
                {title}
              </h2>
            )}
          </div>
        )}
        <div className={isCentered ? "text-center" : "text-left"}>
          {paragraphs.map((paragraph: any, pIdx: number) => {
            const text = paragraph.children?.map((child: any) => child.text).join("") || "";
            return (
              <p key={pIdx} className="text-xl text-gray-600 leading-relaxed font-semibold mb-6" style={textColor ? { color: textColor } : undefined}>
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 3. CARDS GRID BLOCK
export function CardsGridBlock({ badge, title, description, cards, columns, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const colClass = columns === "2" ? "md:grid-cols-2" : columns === "4" ? "md:grid-cols-4" : "md:grid-cols-3";
  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  return (
    <section style={sectionStyle} className="container mx-auto px-4 py-12">
      <SectionHeader title={title} subtitle={description} />
      <div className={`grid grid-cols-1 ${colClass} gap-8 mt-16`}>
        {cards && cards.map((card: any, idx: number) => {
          const imgUrl = card.image && (typeof card.image === "object" ? card.image.url : card.image);

          return (
            <GlassCard key={idx} delay={idx * 0.1} style={cardStyle} className="group overflow-hidden flex flex-col justify-between">
              <div>
                {imgUrl ? (
                  <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-darkblue/20 group-hover:bg-transparent transition-colors" />
                    {card.icon && (
                      <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
                        <DynamicIcon name={card.icon} className="w-6 h-6 text-darkblue" />
                      </div>
                    )}
                  </div>
                ) : (
                  card.icon && (
                    <div className="mb-6 p-4 bg-bglightblue rounded-2xl inline-block text-darkblue">
                      <DynamicIcon name={card.icon} className="w-8 h-8" />
                    </div>
                  )
                )}
                <h3 className="text-2xl font-bold text-darkblue mb-4" style={cardTextColor ? { color: cardTextColor } : undefined}>{card.title}</h3>
                <p className="text-gray-600 leading-relaxed" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>{card.description}</p>
              </div>
              {card.link && (
                <div className="mt-8">
                  <Link href={card.link} className="text-lightblue font-black flex items-center gap-2 group-hover:gap-4 transition-all">
                    Learn More <LucideIcons.ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

// 4. STATS BLOCK
export function StatsBlock({ badge, title, stats, layout, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const isRow = layout === "row";
  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  return (
    <section style={sectionStyle} className="container mx-auto px-4 py-12">
      {title && <SectionHeader title={title} subtitle={badge} />}
      <div className={`mt-16 ${isRow ? "flex flex-wrap justify-center gap-8" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"}`}>
        {stats && stats.map((stat: any, idx: number) => (
          <div
            key={idx}
            style={cardStyle}
            className="p-8 bg-bglightblue rounded-3xl border-b-4 border-yellow shadow-xl text-center min-w-[200px] flex-1"
          >
            <h4 className="text-4xl font-black text-darkblue mb-2" style={cardTextColor ? { color: cardTextColor } : undefined}>{stat.value}</h4>
            <p className="text-lightblue font-bold uppercase text-xs tracking-widest" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 5. TESTIMONIALS BLOCK
export function TestimonialsBlock({ badge, title, description, testimonials, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  return (
    <section style={sectionStyle} className="container mx-auto px-4 py-12">
      <SectionHeader title={title} subtitle={description || badge} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {testimonials && testimonials.map((t: any, idx: number) => {
          const imgUrl = t.image && (typeof t.image === "object" ? t.image.url : t.image);

          return (
            <GlassCard key={idx} delay={idx * 0.1} style={cardStyle} className="flex flex-col justify-between relative overflow-hidden">
              <LucideIcons.Quote className="w-12 h-12 text-yellow/10 absolute top-4 right-4" />
              <p className="text-gray-600 italic leading-relaxed mb-8 relative z-10" style={cardTextColor ? { color: cardTextColor } : undefined}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                {imgUrl ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img src={imgUrl} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-darkblue/10 flex items-center justify-center text-darkblue font-black">
                    {t.name[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-darkblue" style={cardTextColor ? { color: cardTextColor } : undefined}>{t.name}</h4>
                  <p className="text-xs text-lightblue font-black uppercase tracking-wider" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>{t.role}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

// 6. CTA BLOCK
export function CtaBlock({ title, description, button, backgroundType, textColor, backgroundColor, backgroundImage }: any) {
  const isDark = backgroundType === "dark";
  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  return (
    <section style={sectionStyle} className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden border ${isDark ? "glass-dark text-white border-white/10" : "glass text-darkblue border-gray-200"}`}
      >
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight" style={textColor ? { color: textColor } : undefined}>
            {title}
          </h2>
          {description && (
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`} style={textColor ? { color: textColor } : undefined}>
              {description}
            </p>
          )}
          {button && button.label && (
            <div className="flex justify-center">
              <Link
                href={button.link || "#"}
                className="bg-yellow hover:bg-white text-darkblue px-10 py-5 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_rgba(255,195,0,0.3)] hover:shadow-yellow/40 flex items-center gap-3 group hover:-translate-y-1"
              >
                {button.label}
                <LucideIcons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

// 7. TIMELINE BLOCK
export function TimelineBlock({ badge, title, steps, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  return (
    <section style={sectionStyle} className="container mx-auto px-4 py-12">
      <SectionHeader title={title} subtitle={badge} />
      <div className="relative border-l-2 border-dashed border-gray-200 ml-4 md:ml-32 mt-16 max-w-4xl space-y-12">
        {steps && steps.map((step: any, idx: number) => (
          <div key={idx} className="relative pl-12 md:pl-20">
            {/* Circle Badge */}
            <div className="absolute -left-[25px] top-0 w-12 h-12 rounded-full bg-yellow text-darkblue font-black flex items-center justify-center shadow-lg border-4 border-white">
              {step.stepNumber}
            </div>

            <div style={cardStyle} className="glass p-8 rounded-3xl border border-white/20 shadow-xl flex gap-6 items-start">
              {step.icon && (
                <div className="p-3 bg-bglightblue rounded-2xl text-darkblue">
                  <DynamicIcon name={step.icon} className="w-6 h-6" />
                </div>
              )}
              <div>
                <h4 className="text-2xl font-black text-darkblue mb-2" style={cardTextColor ? { color: cardTextColor } : undefined}>{step.title}</h4>
                <p className="text-gray-600 leading-relaxed font-medium" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 8. PARTNERS BLOCK
export function PartnersBlock({ badge, title, partners, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  return (
    <section style={sectionStyle} className="container mx-auto px-4 py-12">
      <SectionHeader title={title} subtitle={badge} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 items-center">
        {partners && partners.map((p: any, idx: number) => {
          const imgUrl = p.logo && (typeof p.logo === "object" ? p.logo.url : p.logo);

          return (
            <div key={idx} style={cardStyle} className="glass p-8 rounded-3xl text-center border border-gray-100 flex items-center justify-center min-h-[120px]">
              {imgUrl ? (
                <div className="relative w-full h-12">
                  <img src={imgUrl} alt={p.name} className="absolute inset-0 w-full h-full object-contain" />
                </div>
              ) : (
                <span className="text-xl font-black text-darkblue/50" style={cardTextColor ? { color: cardTextColor } : undefined}>{p.name}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// 9. TEAM BLOCK
export function TeamBlock({ badge, title, members, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  return (
    <section style={sectionStyle} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader title={title} subtitle={badge} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
          {members && members.map((person: any, idx: number) => {
            const imgUrl = person.image && (typeof person.image === "object" ? person.image.url : person.image);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center group"
              >
                <div className="relative w-72 h-72 lg:w-80 lg:h-80 mx-auto mb-10 rounded-full p-2 border-2 border-dashed border-gray-200 group-hover:border-yellow transition-all duration-700">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-yellow/20 group-hover:scale-[1.05] transition-all duration-500">
                    <img
                      src={imgUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"}
                      alt={person.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-darkblue mb-2 group-hover:text-yellow transition-colors" style={cardTextColor ? { color: cardTextColor } : undefined}>{person.name}</h3>
                <p className="text-lightblue font-black uppercase tracking-widest text-sm" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>{person.role}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 10. MAP SECTION BLOCK
export function MapSectionBlock({ title, address, embedUrl, contacts, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  return (
    <section style={sectionStyle} className="container mx-auto px-4 py-12 pb-24">
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
        <div className="flex flex-col gap-6 h-full justify-center">
          <div style={cardStyle} className="glass p-8 rounded-[2.5rem] border border-white/20 shadow-xl">
            <h4 className="text-3xl font-black text-darkblue mb-4" style={cardTextColor ? { color: cardTextColor } : undefined}>Visit Our Office</h4>
            <p className="text-gray-600 font-bold leading-relaxed text-lg mb-6" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>
              {address}
            </p>
            {contacts && contacts.length > 0 && (
              <div className="space-y-4 border-t border-gray-100 pt-6">
                {contacts.map((contact: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-black text-lightblue uppercase tracking-wider text-sm" style={cardTextColor ? { color: cardTextColor } : undefined}>{contact.label}</span>
                    <span className="font-black text-darkblue" style={cardTextColor ? { color: cardTextColor } : undefined}>{contact.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {embedUrl && (
          <div className="h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl relative border-8 border-white group">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// 11. CONTACT FORM BLOCK
export function ContactFormBlock({ title, description, fields, submitLabel, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({});
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section style={sectionStyle} className="container mx-auto px-4 max-w-3xl py-12">
      <div style={cardStyle} className="glass p-12 rounded-[3rem] border border-white/20 shadow-2xl">
        <h3 className="text-3xl font-black text-darkblue mb-2" style={cardTextColor ? { color: cardTextColor } : undefined}>{title}</h3>
        <p className="text-gray-500 mb-8 font-medium" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>{description}</p>

        {success && (
          <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl mb-6 font-bold border border-emerald-100">
            Thank you! Your message has been sent successfully.
          </div>
        )}
        {error && (
          <div className="bg-rose-50 text-rose-800 p-6 rounded-2xl mb-6 font-bold border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {fields && fields.map((field: any, idx: number) => {
            const isTextArea = field.type === "textarea";
            const commonProps = {
              name: field.name,
              id: field.name,
              required: field.required,
              placeholder: field.placeholder,
              value: formData[field.name] || "",
              onChange: handleChange,
              className: "w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-lightblue/10 focus:border-lightblue transition-all bg-white font-semibold text-darkblue",
            };

            return (
              <div key={idx} className="flex flex-col gap-2">
                <label htmlFor={field.name} className="text-sm font-black text-darkblue uppercase tracking-wider" style={cardTextColor ? { color: cardTextColor } : undefined}>
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>
                {isTextArea ? (
                  <textarea rows={5} {...commonProps} />
                ) : (
                  <input type={field.type} {...commonProps} />
                )}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow hover:bg-darkblue hover:text-white text-darkblue py-5 rounded-full font-black text-lg transition-all shadow-lg hover:-translate-y-1 disabled:opacity-50"
          >
            {loading ? "Sending..." : submitLabel || "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

// 12. JOBS SECTION BLOCK
export function JobsSectionBlock({ badge, title, description, emptyMessage, textColor, backgroundColor, backgroundImage, cardBgColor, cardTextColor }: any) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionStyle = applyStyles(backgroundColor, backgroundImage, textColor);

  const cardStyle: React.CSSProperties = {};
  if (cardBgColor) cardStyle.backgroundColor = cardBgColor;
  if (cardTextColor) cardStyle.color = cardTextColor;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data.jobs?.filter((j: any) => !j.isDeleted && j.isActive) || []);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section style={sectionStyle} className="container mx-auto px-4 py-12">
      <SectionHeader title={title} subtitle={description || badge} />
      {loading ? (
        <div className="text-center py-16 text-gray-400 font-bold">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 text-gray-400 font-bold" style={textColor ? { color: textColor } : undefined}>{emptyMessage || "No open positions at this time."}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {jobs.map((job: any) => (
            <div key={job.id} style={cardStyle} className="glass p-8 rounded-3xl border border-gray-100 flex flex-col h-full">
              <h3 className="text-2xl font-black text-darkblue mb-3" style={cardTextColor ? { color: cardTextColor } : undefined}>{job.title}</h3>
              <p className="text-sm font-semibold text-lightblue uppercase tracking-wider mb-4" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>
                {job.location} &middot; {job.jobType?.replace(/_/g, " ")}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3" style={cardTextColor ? { color: cardTextColor, opacity: 0.85 } : undefined}>{job.description}</p>
              <div className="mt-auto pt-6 border-t border-gray-100">
                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex items-center gap-2 text-darkblue font-black hover:text-yellow transition-colors"
                  style={cardTextColor ? { color: cardTextColor } : undefined}
                >
                  Apply Now <LucideIcons.ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
