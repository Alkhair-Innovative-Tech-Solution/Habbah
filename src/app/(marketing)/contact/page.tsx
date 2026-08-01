"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  GraduationCap,
  Heart,
  Loader2,
  AlertCircle,
  Calendar,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import { gsap } from "@/lib/gsap";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "", preferredDate: "" });
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".reach-info", {
        x: -30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reach-info", start: "top 80%" },
      });
      gsap.from(".reach-map-panel", {
        x: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reach-map-panel", start: "top 80%" },
      });
      gsap.from(".contact-form-panel", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form-panel", start: "top 80%" },
      });
      gsap.from(".trust-badges", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-badges", start: "top 90%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-24 pb-24">
      <PageHero
        eyebrow="Get In Touch"
        title="Contact"
        accent="Habbah"
        subtitle="Unlock the door to quality education and a brighter future. Together, let's build a community of extraordinary individuals."
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Contact background"
      />

      {/* Reach Us + Map Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="reach-info glass-brand p-12 md:p-16 rounded-[4rem] flex flex-col justify-center space-y-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-green-deep mb-6 tracking-tight">
                Here&apos;s how to <span className="gold-shimmer-text">reach us</span>
              </h2>
              <div className="space-y-8">
                {[
                  { Icon: MapPin, title: "Our Location", text: "Habbah Educational Trust\nF-100, Block-B, North Nazimabad, Karachi" },
                  { Icon: Mail, title: "Email Us", text: "habbahclub@gmail.com" },
                  { Icon: Phone, title: "Call Us", text: "+92 300 0220635" },
                ].map(({ Icon, title, text }) => (
                  <div key={title} className="flex gap-6 items-start group">
                    <div className="p-4 bg-green-deep text-gold-rich rounded-2xl group-hover:rotate-6 transition-transform shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-body font-medium text-green-deep uppercase tracking-widest text-xs mb-1">{title}</h4>
                      <p className="font-body text-charcoal-soft text-lg leading-relaxed whitespace-pre-line">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reach-map-panel relative rounded-[4rem] overflow-hidden shadow-2xl border-8 border-off-white min-h-125 group">
            <iframe
              src="https://maps-api-ssl.google.com/maps?hl=en-GB&ll=24.929,67.040948&output=embed&q=24.928435,67.040924+(Habbah+Educational+Trust)&z=17"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale contrast-125 brightness-110 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute top-8 left-8 bg-green-deep text-gold-rich px-6 py-2 rounded-full font-body font-medium text-xs uppercase tracking-widest shadow-xl">
              Live Location
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeader
              title="Send Us a Message"
              subtitle="Fill out the form below and our team will get back to you shortly"
            />
          </div>

          <div className="contact-form-panel relative">
            <div className="absolute -inset-4 bg-linear-to-tr from-gold-rich/20 to-green-mid/10 rounded-[5rem] blur-2xl -z-10 opacity-60" />

            <div className="glass-brand rounded-[4rem] p-8 md:p-14 shadow-2xl">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-green-deep rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-deep/30">
                    <CheckCircle className="w-12 h-12 text-gold-rich" />
                  </div>
                  <h3 className="font-display text-3xl font-medium text-green-deep mb-4 tracking-tight">Message Sent!</h3>
                  <p className="font-body text-charcoal-soft text-lg mb-8 max-w-md mx-auto">
                    Thank you for reaching out. Our team will contact you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-4 bg-green-deep text-off-white font-body font-medium rounded-2xl hover:bg-green-rich transition-all shadow-lg shadow-green-deep/20 uppercase tracking-widest text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest">
                        Full Name <span className="text-gold-deep">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="font-body bg-off-white/80 border-2 border-gold-rich/15 rounded-2xl px-5 py-4 text-green-deep placeholder:text-charcoal-soft/40 focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest">
                        Email Address <span className="text-gold-deep">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="font-body bg-off-white/80 border-2 border-gold-rich/15 rounded-2xl px-5 py-4 text-green-deep placeholder:text-charcoal-soft/40 focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+92 300 0000000"
                        className="font-body bg-off-white/80 border-2 border-gold-rich/15 rounded-2xl px-5 py-4 text-green-deep placeholder:text-charcoal-soft/40 focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all"
                      />
                    </div>

                    {/* Preferred Date */}
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Preferred Meeting Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={handleChange}
                        className="font-body bg-off-white/80 border-2 border-gold-rich/15 rounded-2xl px-5 py-4 text-green-deep focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest">
                      Your Message <span className="text-gold-deep">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                      rows={6}
                      className="font-body bg-off-white/80 border-2 border-gold-rich/15 rounded-2xl px-5 py-4 text-green-deep placeholder:text-charcoal-soft/40 focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-100 rounded-2xl">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <p className="text-red-600 font-body font-medium text-sm">{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto px-10 py-5 bg-green-deep text-off-white font-body font-medium rounded-2xl hover:bg-green-rich transition-all shadow-xl shadow-green-deep/20 uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final Callout */}
      <section className="container mx-auto px-4 pb-12">
        <div className="trust-badges flex flex-wrap justify-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-3 font-body font-medium text-green-deep uppercase tracking-[0.2em] text-sm">
            <GraduationCap className="w-6 h-6" /> Quality Education
          </div>
          <div className="flex items-center gap-3 font-body font-medium text-green-deep uppercase tracking-[0.2em] text-sm">
            <Heart className="w-6 h-6 text-gold-deep" /> Community Support
          </div>
          <div className="flex items-center gap-3 font-body font-medium text-green-deep uppercase tracking-[0.2em] text-sm">
            <CheckCircle className="w-6 h-6 text-gold-rich" /> Reliable Future
          </div>
        </div>
      </section>
    </div>
  );
}
