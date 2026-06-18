"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import SectionHeader from "./SectionHeader";
import GlassCard from "./GlassCard";

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
};

const resolveImgUrl = (img: any): string | undefined => {
  if (!img) return undefined;
  if (typeof img === "string") return img;
  if (img?.url) return img.url;
  return undefined;
};

const hexToRgba = (hex: string, opacityPercent: number): string => {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  if (c.length === 6) {
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacityPercent / 100})`;
  }
  return hex;
};

const getSectionStyle = (props: any, defaultPaddingTop?: string, defaultPaddingBottom?: string): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  const type = props.bgColorType || "none";

  if (type === "solid" && props.bgSolidColor) {
    styles.backgroundColor = props.bgSolidColor;
  } else if (type === "gradient" && props.bgGradientFrom && props.bgGradientTo) {
    const dirMap: Record<string, string> = {
      "to-b": "to bottom",
      "to-t": "to top",
      "to-r": "to right",
      "to-l": "to left",
      "to-br": "to bottom right",
      "to-bl": "to bottom left",
    };
    styles.background = `linear-gradient(${dirMap[props.bgGradientType] || "to bottom"}, ${props.bgGradientFrom}, ${props.bgGradientTo})`;
  } else if (type === "image") {
    const imgUrl = resolveImgUrl(props.bgImage);
    if (imgUrl) {
      styles.backgroundImage = `url(${imgUrl})`;
      styles.backgroundSize = "cover";
      styles.backgroundPosition = "center";
    }
    if (props.bgImageOverlay) {
      const opacity = parseInt(props.bgImageOverlayOpacity || "50", 10);
      styles.backgroundColor = hexToRgba(props.bgImageOverlay, opacity);
      styles.backgroundBlendMode = "overlay";
    }
  }

  if (!styles.backgroundColor && !styles.background && props.backgroundColor) {
    styles.backgroundColor = props.backgroundColor;
  }
  if (!styles.backgroundImage && props.backgroundImage) {
    styles.backgroundImage = `url(${props.backgroundImage})`;
    styles.backgroundSize = "cover";
    styles.backgroundPosition = "center";
  }

  if (props.textColor) styles.color = props.textColor;

  // Margin Top
  if (props.marginTop === "none") styles.marginTop = "0px";
  else if (props.marginTop === "small") styles.marginTop = "1rem";
  else if (props.marginTop === "medium") styles.marginTop = "2rem";
  else if (props.marginTop === "large") styles.marginTop = "4rem";
  else if (props.marginTop === "xlarge") styles.marginTop = "6rem";
  if (props.marginTopCustom) styles.marginTop = props.marginTopCustom;

  // Margin Bottom
  if (props.marginBottom === "none") styles.marginBottom = "0px";
  else if (props.marginBottom === "small") styles.marginBottom = "1rem";
  else if (props.marginBottom === "medium") styles.marginBottom = "2rem";
  else if (props.marginBottom === "large") styles.marginBottom = "4rem";
  else if (props.marginBottom === "xlarge") styles.marginBottom = "6rem";
  if (props.marginBottomCustom) styles.marginBottom = props.marginBottomCustom;

  // Padding Top
  if (props.paddingTop === "none") styles.paddingTop = "0px";
  else if (props.paddingTop === "small") styles.paddingTop = "1.5rem";
  else if (props.paddingTop === "medium") styles.paddingTop = "3rem";
  else if (props.paddingTop === "large") styles.paddingTop = "5rem";
  else if (props.paddingTop === "xlarge") styles.paddingTop = "8rem";
  else if (props.paddingTop === "xxlarge") styles.paddingTop = "12rem";
  else if (props.paddingTop === "default" || !props.paddingTop) {
    if (defaultPaddingTop) styles.paddingTop = defaultPaddingTop;
  }
  if (props.paddingTopCustom) styles.paddingTop = props.paddingTopCustom;

  // Padding Bottom
  if (props.paddingBottom === "none") styles.paddingBottom = "0px";
  else if (props.paddingBottom === "small") styles.paddingBottom = "1.5rem";
  else if (props.paddingBottom === "medium") styles.paddingBottom = "3rem";
  else if (props.paddingBottom === "large") styles.paddingBottom = "5rem";
  else if (props.paddingBottom === "xlarge") styles.paddingBottom = "8rem";
  else if (props.paddingBottom === "xxlarge") styles.paddingBottom = "12rem";
  else if (props.paddingBottom === "default" || !props.paddingBottom) {
    if (defaultPaddingBottom) styles.paddingBottom = defaultPaddingBottom;
  }
  if (props.paddingBottomCustom) styles.paddingBottom = props.paddingBottomCustom;

  // Alignment
  if (props.sectionAlignment && props.sectionAlignment !== "default") {
    styles.textAlign = props.sectionAlignment;
  }

  return styles;
};

const getCardStyles = (props: any): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  if (props.cardBgColor) styles.backgroundColor = props.cardBgColor;
  if (props.cardTextColor) styles.color = props.cardTextColor;
  if (props.cardBorderColor) styles.borderColor = props.cardBorderColor;
  return styles;
};

const getAnimProps = (props: any) => {
  const enabled = props.animEnabled !== false;
  const type = props.animType || "fadeUp";
  const duration = parseFloat(props.animDuration || "0.8");
  if (!enabled || type === "none") return {};
  const variants: Record<string, { initial: any; whileInView: any }> = {
    fadeUp: { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } },
    fadeIn: { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
    fadeLeft: { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 } },
    fadeRight: { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 } },
    zoomIn: { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } },
  };
  const anim = variants[type] || variants.fadeUp;
  return {
    ...anim,
    transition: { duration, ease: [0.21, 0.47, 0.32, 0.98] },
    viewport: { once: true },
  };
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

function AnimatedSection({ children, animProps, style, className }: any) {
  const hasAnim = animProps && Object.keys(animProps).length > 0;
  if (hasAnim) {
    return <motion.section className={className} style={style} {...animProps}>{children}</motion.section>;
  }
  return <section className={className} style={style}>{children}</section>;
}

export function HeroBlock(props: any) {
  const { badge, title, subtitle, highlightWord, cta, stats } = props;
  const isDark = props.backgroundType === "darkblue" || !props.bgColorType || props.bgColorType === "none";
  const sectionStyle = getSectionStyle(props);
  const anim = getAnimProps(props);
  const bgImgSrc = resolveImgUrl(props.bgImage) || props.backgroundImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop";
  const headingColor = props.headingColor || props.textColor;
  const btnStyle: React.CSSProperties = {};
  if (props.btnTextColor) btnStyle.color = props.btnTextColor;
  if (props.btnBgColor) btnStyle.backgroundColor = props.btnBgColor;

  const renderTitle = () => {
    if (!highlightWord || !title) return title;
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
    <AnimatedSection animProps={anim} style={sectionStyle} className={`relative min-h-[95vh] flex items-center justify-center pt-20 overflow-hidden ${isDark && !sectionStyle.backgroundColor ? "bg-darkblue" : "bg-white"}`}>
      <div className="absolute inset-0 z-0">
        <img
          src={bgImgSrc}
          alt=""
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
              style={{
                color: props.badgeColor || (headingColor || undefined),
                backgroundColor: props.badgeBgColor || undefined,
                borderColor: props.badgeBgColor || undefined,
              }}
            >
              {badge}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tighter ${isDark ? "text-white text-shadow-lg" : "text-darkblue"}`}
            style={{ color: headingColor || undefined }}
          >
            {renderTitle()}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-semibold ${isDark ? "text-white/90 text-shadow-lg" : "text-gray-600"}`}
              style={{ color: props.textColor || undefined }}
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
                style={btnStyle}
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

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              {stats.map((stat: any, sIdx: number) => (
                <div
                  key={sIdx}
                  className={`p-6 rounded-2xl backdrop-blur-md border ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-darkblue/5 border-darkblue/10 text-darkblue"}`}
                  style={{ color: props.textColor || undefined }}
                >
                  <h4 className="text-3xl font-black">{stat.value}</h4>
                  <p className="text-sm font-semibold opacity-80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-lightblue/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-darkblue/5 rounded-full blur-[120px]" />
    </AnimatedSection>
  );
}

export function TextBlock(props: any) {
  const { badge, title, content, layout, cta } = props;
  const isCentered = layout === "centered";
  const isLeft = layout === "left";
  const isRight = layout === "right";
  const isLightBlue = props.background === "lightblue" && !props.bgColorType;
  const sectionStyle = getSectionStyle(props, "5rem", "5rem");
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

  let paragraphs: any[] = [];
  if (Array.isArray(content)) {
    paragraphs = content;
  } else if (content && typeof content === "object" && content.root && Array.isArray(content.root.children)) {
    paragraphs = content.root.children;
  }

  const imgUrl = resolveImgUrl(props.image);
  const showImage = imgUrl && ["text-left-image-right", "text-right-image-left", "image-top", "image-bottom"].includes(layout);
  const isTwoCol = showImage && ["text-left-image-right", "text-right-image-left"].includes(layout);

  const renderTextContent = () => (
    <div className={isCentered ? "text-center" : isRight ? "text-right" : "text-left"}>
      {badge && (
        <span className="text-lightblue font-black uppercase tracking-[0.2em] text-sm mb-2 block" style={{
          color: props.badgeColor || props.textColor || undefined,
          backgroundColor: props.badgeBgColor || undefined,
        }}>
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-4xl md:text-5xl font-black text-darkblue tracking-tight mb-8" style={{ color: headingColor || undefined }}>
          {title}
        </h2>
      )}
      {paragraphs.map((paragraph: any, pIdx: number) => {
        const text = paragraph.children?.map((child: any) => child.text).join("") || "";
        return (
          <p key={pIdx} className="text-xl text-gray-600 leading-relaxed font-semibold mb-6" style={{ color: props.textColor || undefined }}>
            {text}
          </p>
        );
      })}
      {cta && cta.label && (
        <div className={`mt-8 flex ${isCentered ? "justify-center" : isRight ? "justify-end" : "justify-start"}`}>
          <Link
            href={cta.link || "#"}
            className="bg-yellow hover:bg-white text-darkblue px-10 py-5 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_rgba(255,195,0,0.3)] hover:shadow-yellow/40 flex items-center gap-3 group hover:-translate-y-1"
            style={{
              color: props.btnTextColor || undefined,
              backgroundColor: props.btnBgColor || undefined,
            }}
          >
            {cta.label}
            <LucideIcons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );

  const renderImage = () => {
    if (!imgUrl) return null;
    const imgStyle = props.imageStyle || {};
    const brClass = imgStyle.borderRadius || "rounded-2xl";
    const shadowClass = imgStyle.shadow || "shadow-2xl";
    const aspectClass = imgStyle.aspectRatio || "aspect-auto";

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`relative overflow-hidden w-full ${brClass} ${shadowClass} ${aspectClass} group`}
      >
        <img
          src={imgUrl}
          alt={title || "Section Image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
    );
  };

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className={`w-full relative overflow-hidden ${isLightBlue ? "bg-bglightblue" : ""}`}>
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {isTwoCol ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {layout === "text-left-image-right" ? (
              <>
                {renderTextContent()}
                {renderImage()}
              </>
            ) : (
              <>
                {renderImage()}
                {renderTextContent()}
              </>
            )}
          </div>
        ) : showImage && layout === "image-top" ? (
          <div className="flex flex-col gap-10 items-center">
            <div className="max-w-4xl w-full">{renderImage()}</div>
            <div className="max-w-4xl w-full">{renderTextContent()}</div>
          </div>
        ) : showImage && layout === "image-bottom" ? (
          <div className="flex flex-col gap-10 items-center">
            <div className="max-w-4xl w-full">{renderTextContent()}</div>
            <div className="max-w-4xl w-full">{renderImage()}</div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {renderTextContent()}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

export function CardsGridBlock(props: any) {
  const { badge, title, description, cards, columns } = props;
  const colClass = columns === "2" ? "md:grid-cols-2" : columns === "4" ? "md:grid-cols-4" : "md:grid-cols-3";
  const sectionStyle = getSectionStyle(props, "3rem", "3rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={description} center={props.sectionAlignment !== "left"} headingColor={headingColor} textColor={props.textColor} />
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
                  <h3 className="text-2xl font-bold text-darkblue mb-4" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.textColor ? { color: props.textColor, opacity: 0.85 } : undefined)}>{card.description}</p>
                </div>
                {card.link && (
                  <div className="mt-8">
                    <Link href={card.link} className="text-lightblue font-black flex items-center gap-2 group-hover:gap-4 transition-all" style={props.accentColor ? { color: props.accentColor } : undefined}>
                      Learn More <LucideIcons.ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function StatsBlock(props: any) {
  const { badge, title, stats, layout } = props;
  const isRow = layout === "row";
  const sectionStyle = getSectionStyle(props, "3rem", "3rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4">
        {title && <SectionHeader title={title} subtitle={badge} center={props.sectionAlignment !== "left"} headingColor={headingColor} textColor={props.textColor} />}
        <div className={`mt-16 ${isRow ? "flex flex-wrap justify-center gap-8" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"}`}>
          {stats && stats.map((stat: any, idx: number) => (
            <div
              key={idx}
              style={cardStyle}
              className="p-8 bg-bglightblue rounded-3xl border-b-4 border-yellow shadow-xl text-center min-w-[200px] flex-1"
            >
              <h4 className="text-4xl font-black text-darkblue mb-2" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>{stat.value}</h4>
              <p className="text-lightblue font-bold uppercase text-xs tracking-widest" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.textColor ? { color: props.textColor, opacity: 0.85 } : undefined)}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function TestimonialsBlock(props: any) {
  const { badge, title, description, testimonials } = props;
  const sectionStyle = getSectionStyle(props, "3rem", "3rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={description || badge} center={props.sectionAlignment !== "left"} headingColor={headingColor} textColor={props.textColor} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials && testimonials.map((t: any, idx: number) => {
            const imgUrl = t.image && (typeof t.image === "object" ? t.image.url : t.image);

            return (
              <GlassCard key={idx} delay={idx * 0.1} style={cardStyle} className="flex flex-col justify-between relative overflow-hidden">
                <LucideIcons.Quote className="w-12 h-12 text-yellow/10 absolute top-4 right-4" />
                <p className="text-gray-600 italic leading-relaxed mb-8 relative z-10" style={cardStyle.color ? { color: cardStyle.color } : (props.textColor ? { color: props.textColor } : undefined)}>
                  &quot;{t.quote}&quot;
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
                    <h4 className="font-bold text-darkblue" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>{t.name}</h4>
                    <p className="text-xs text-lightblue font-black uppercase tracking-wider" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.accentColor ? { color: props.accentColor } : undefined)}>{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function CtaBlock(props: any) {
  const { title, description, button } = props;
  const isDark = props.backgroundType === "dark" && !props.bgColorType;
  const sectionStyle = getSectionStyle(props, "3rem", "3rem");
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;
  const btnStyle: React.CSSProperties = {};
  if (props.btnTextColor) btnStyle.color = props.btnTextColor;
  if (props.btnBgColor) btnStyle.backgroundColor = props.btnBgColor;

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden border ${isDark ? "glass-dark text-white border-white/10" : "glass text-darkblue border-gray-200"}`}
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight" style={{ color: headingColor || undefined }}>
              {title}
            </h2>
            {description && (
              <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`} style={{ color: props.textColor || undefined }}>
                {description}
              </p>
            )}
            {button && button.label && (
              <div className="flex justify-center">
                <Link
                  href={button.link || "#"}
                  className="bg-yellow hover:bg-white text-darkblue px-10 py-5 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_rgba(255,195,0,0.3)] hover:shadow-yellow/40 flex items-center gap-3 group hover:-translate-y-1"
                  style={btnStyle}
                >
                  {button.label}
                  <LucideIcons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export function TimelineBlock(props: any) {
  const { badge, title, steps } = props;
  const sectionStyle = getSectionStyle(props, "3rem", "3rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={badge} center={props.sectionAlignment !== "left"} headingColor={headingColor} textColor={props.textColor} />
        <div className="relative border-l-2 border-dashed border-gray-200 ml-4 md:ml-32 mt-16 max-w-4xl space-y-12">
          {steps && steps.map((step: any, idx: number) => (
            <div key={idx} className="relative pl-12 md:pl-20">
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
                  <h4 className="text-2xl font-black text-darkblue mb-2" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed font-medium" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.textColor ? { color: props.textColor, opacity: 0.85 } : undefined)}>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function PartnersBlock(props: any) {
  const { badge, title, partners } = props;
  const sectionStyle = getSectionStyle(props, "3rem", "3rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={badge} center={props.sectionAlignment !== "left"} headingColor={headingColor} textColor={props.textColor} />
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
                  <span className="text-xl font-black text-darkblue/50" style={cardStyle.color ? { color: cardStyle.color } : (props.textColor ? { color: props.textColor } : undefined)}>{p.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function TeamBlock(props: any) {
  const { badge, title, members } = props;
  const sectionStyle = getSectionStyle(props, "5rem", "5rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className="py-20 relative overflow-hidden w-full">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader title={title} subtitle={badge} center={props.sectionAlignment !== "left"} headingColor={headingColor} textColor={props.textColor} />

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
                <h3 className="text-3xl font-black text-darkblue mb-2 group-hover:text-yellow transition-colors" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>{person.name}</h3>
                <p className="text-lightblue font-black uppercase tracking-widest text-sm" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.textColor ? { color: props.textColor, opacity: 0.85 } : undefined)}>{person.role}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function MapSectionBlock(props: any) {
  const { title, address, embedUrl, contacts } = props;
  const sectionStyle = getSectionStyle(props, "3rem", "6rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

  return (
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4">
        <SectionHeader title={title} center={props.sectionAlignment !== "left"} headingColor={headingColor} textColor={props.textColor} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          <div className="flex flex-col gap-6 h-full justify-center">
            <div style={cardStyle} className="glass p-8 rounded-[2.5rem] border border-white/20 shadow-xl">
              <h4 className="text-3xl font-black text-darkblue mb-4" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>Visit Our Office</h4>
              <p className="text-gray-600 font-bold leading-relaxed text-lg mb-6" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.textColor ? { color: props.textColor, opacity: 0.85 } : undefined)}>
                {address}
              </p>
              {contacts && contacts.length > 0 && (
                <div className="space-y-4 border-t border-gray-100 pt-6">
                  {contacts.map((contact: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="font-black text-lightblue uppercase tracking-wider text-sm" style={cardStyle.color ? { color: cardStyle.color } : (props.accentColor ? { color: props.accentColor } : undefined)}>{contact.label}</span>
                      <span className="font-black text-darkblue" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>{contact.value}</span>
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
      </div>
    </AnimatedSection>
  );
}

export function ContactFormBlock(props: any) {
  const { title, description, fields, submitLabel } = props;
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sectionStyle = getSectionStyle(props, "3rem", "3rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

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
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4 max-w-3xl">
        <div style={cardStyle} className="glass p-12 rounded-[3rem] border border-white/20 shadow-2xl">
          <h3 className="text-3xl font-black text-darkblue mb-2" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>{title}</h3>
          <p className="text-gray-500 mb-8 font-medium" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.textColor ? { color: props.textColor, opacity: 0.85 } : undefined)}>{description}</p>

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
                  <label htmlFor={field.name} className="text-sm font-black text-darkblue uppercase tracking-wider" style={cardStyle.color ? { color: cardStyle.color } : (props.textColor ? { color: props.textColor } : undefined)}>
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
              style={{
                color: props.btnTextColor || undefined,
                backgroundColor: props.btnBgColor || undefined,
              }}
            >
              {loading ? "Sending..." : submitLabel || "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function JobsSectionBlock(props: any) {
  const { badge, title, description, emptyMessage } = props;
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionStyle = getSectionStyle(props, "3rem", "3rem");
  const cardStyle = getCardStyles(props);
  const anim = getAnimProps(props);
  const headingColor = props.headingColor || props.textColor;

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
    <AnimatedSection animProps={anim} style={sectionStyle} className="w-full">
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={description || badge} center={props.sectionAlignment !== "left"} headingColor={headingColor} textColor={props.textColor} />
        {loading ? (
          <div className="text-center py-16 text-gray-400 font-bold">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-bold" style={{ color: props.textColor || undefined }}>{emptyMessage || "No open positions at this time."}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {jobs.map((job: any) => (
              <div key={job.id} style={cardStyle} className="glass p-8 rounded-3xl border border-gray-100 flex flex-col h-full">
                <h3 className="text-2xl font-black text-darkblue mb-3" style={cardStyle.color ? { color: cardStyle.color } : (headingColor ? { color: headingColor } : undefined)}>{job.title}</h3>
                <p className="text-sm font-semibold text-lightblue uppercase tracking-wider mb-4" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.accentColor ? { color: props.accentColor } : undefined)}>
                  {job.location} &middot; {job.jobType?.replace(/_/g, " ")}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3" style={cardStyle.color ? { color: cardStyle.color, opacity: 0.85 } : (props.textColor ? { color: props.textColor, opacity: 0.85 } : undefined)}>{job.description}</p>
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-2 text-darkblue font-black hover:text-yellow transition-colors"
                    style={cardStyle.color ? { color: cardStyle.color } : (props.textColor ? { color: props.textColor } : undefined)}
                  >
                    Apply Now <LucideIcons.ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
