"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Send,
  Heart,
  Users,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Calendar,
  Building,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { GENERAL_INTEREST_JOB_ID } from "@/lib/constants";

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-Time",
  PART_TIME: "Part-Time",
  INTERNSHIP: "Internship",
  CONTRACT: "Contract",
};

const JOB_TYPE_COLORS: Record<string, string> = {
  FULL_TIME: "bg-green-deep text-off-white",
  PART_TIME: "bg-gold-rich/10 text-gold-deep border border-gold-rich/30",
  INTERNSHIP: "bg-green-mid/10 text-green-mid border border-green-mid/30",
  CONTRACT: "bg-cream-warm text-charcoal-soft border border-gold-rich/15",
};

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  jobType: string;
  department?: string | null;
  deadlineAt?: string | null;
}

interface ApplyForm {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter: string;
  experience: string;
  education: string;
}

interface VolunteerForm {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState<ApplyForm>({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    coverLetter: "",
    experience: "",
    education: "",
  });
  const [applyStatus, setApplyStatus] = useState<FormStatus>("idle");
  const [applyError, setApplyError] = useState("");

  // Volunteer form
  const [volForm, setVolForm] = useState<VolunteerForm>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [volStatus, setVolStatus] = useState<FormStatus>("idle");
  const [volError, setVolError] = useState("");
  const applyModalRef = useRef<HTMLDivElement>(null);
  const firstApplyFieldRef = useRef<HTMLInputElement>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const jobsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load jobs");
        return r.json();
      })
      .then((d: { jobs?: Job[] }) =>
        setJobs((d.jobs || []).filter((j) => j.id !== GENERAL_INTEREST_JOB_ID))
      )
      .catch(() =>
        setJobsError("We couldn't load open positions right now. Please refresh the page or try again shortly.")
      )
      .finally(() => setLoadingJobs(false));
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set([".careers-eyebrow", ".careers-word", ".careers-sub", ".careers-badges"], {
        opacity: 0,
        y: 20,
      });
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(".careers-eyebrow", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(".careers-word", { opacity: 1, y: 0, stagger: 0.06, duration: 0.7, ease: "power3.out" }, "-=0.3")
        .to(".careers-sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(".careers-badges", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      gsap.from(".volunteer-text", {
        x: -30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".volunteer-text", start: "top 80%" },
      });
      gsap.from(".volunteer-form-panel", {
        x: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".volunteer-form-panel", start: "top 80%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Reveal job cards via GSAP once they arrive (async data, mounts after initial render).
  useEffect(() => {
    if (!jobsGridRef.current || jobs.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".job-card").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          delay: i * 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, jobsGridRef);

    return () => ctx.revert();
  }, [jobs]);

  const openApply = (job: Job) => {
    setSelectedJob(job);
    setApplyStatus("idle");
    setApplyForm({ applicantName: "", applicantEmail: "", applicantPhone: "", coverLetter: "", experience: "", education: "" });
    setShowApplyModal(true);
  };

  // Modal accessibility: close on Escape, and move focus into the dialog
  // so keyboard/screen-reader users land somewhere sensible on open.
  useEffect(() => {
    if (!showApplyModal) return;

    firstApplyFieldRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowApplyModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showApplyModal]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setApplyStatus("loading");
    setApplyError("");

    try {
      const res = await fetch(`/api/jobs/${selectedJob.id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applyForm),
      });
      if (res.ok) {
        setApplyStatus("success");
      } else {
        const d = await res.json();
        setApplyError(d.error || "Failed to submit. Please try again.");
        setApplyStatus("error");
      }
    } catch {
      setApplyError("Network error. Please try again.");
      setApplyStatus("error");
    }
  };

  const handleVolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolStatus("loading");
    setVolError("");

    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volForm),
      });
      if (res.ok) {
        setVolStatus("success");
        setVolForm({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        const d = await res.json();
        setVolError(d.error || "Failed to submit.");
        setVolStatus("error");
      }
    } catch {
      setVolError("Network error. Please try again.");
      setVolStatus("error");
    }
  };

  return (
    <div ref={rootRef} className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-green-deep min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-150 h-150 bg-gold-rich/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-green-mid/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="careers-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-rich/10 border border-gold-rich/20 text-gold-rich text-xs font-medium uppercase tracking-[0.2em] mb-8 font-body">
            <Briefcase className="w-3 h-3" /> Join Our Team
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-light text-off-white mb-6 leading-[0.9] tracking-tight">
            <span className="careers-word inline-block">Careers</span>{" "}
            <span className="careers-word inline-block">at</span>{" "}
            <span className="careers-word gold-shimmer-text inline-block">Habbah</span>
          </h1>

          <p className="careers-sub font-body text-off-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Be part of a mission-driven team transforming lives through quality education and community support.
          </p>

          <div className="careers-badges flex flex-wrap gap-8 justify-center mt-12 text-off-white/60">
            {[
              { icon: Users, label: "Collaborative Culture" },
              { icon: GraduationCap, label: "Growth Opportunities" },
              { icon: Heart, label: "Mission-Driven Work" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 font-body font-medium text-sm">
                <Icon className="w-4 h-4 text-gold-rich" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section ref={jobsGridRef} className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-xs font-medium text-gold-deep uppercase tracking-[0.3em] mb-4">Open Positions</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-green-deep tracking-tight">
            Current Openings
          </h2>
          <p className="font-body text-charcoal-soft mt-4 max-w-xl mx-auto">
            Explore our available positions and find your perfect role in making a difference.
          </p>
        </div>

        {loadingJobs ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-16 h-16 border-4 border-green-deep/10 border-t-gold-rich rounded-full animate-spin mb-4" />
            <p className="font-body text-charcoal-soft/60 font-medium uppercase tracking-widest text-sm">Loading jobs...</p>
          </div>
        ) : jobsError ? (
          <div className="text-center py-20 bg-red-50 rounded-[3rem] border-2 border-dashed border-red-200">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="font-display text-green-deep font-medium text-2xl mb-2">Couldn't Load Positions</p>
            <p className="font-body text-charcoal-soft/60">{jobsError}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-cream-warm rounded-[3rem] border-2 border-dashed border-gold-rich/20">
            <Briefcase className="w-16 h-16 text-gold-rich/40 mx-auto mb-4" />
            <p className="font-display text-green-deep font-medium text-2xl mb-2">No Open Positions</p>
            <p className="font-body text-charcoal-soft/60">Check back soon or submit a general interest application below.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="job-card group bg-off-white rounded-[2.5rem] border-2 border-gold-rich/10 hover:border-gold-rich/30 shadow-sm hover:shadow-[0_20px_60px_rgba(26,53,40,0.08)] transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Card Top */}
                <div className="p-8 flex-1">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 bg-green-deep text-gold-rich rounded-2xl flex items-center justify-center shadow-lg shadow-green-deep/20 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className={`font-body px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest ${JOB_TYPE_COLORS[job.jobType] || "bg-cream-warm text-charcoal-soft"}`}>
                      {JOB_TYPE_LABELS[job.jobType] || job.jobType}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-medium text-green-deep tracking-tight mb-3 group-hover:text-gold-deep transition-colors">
                    {job.title}
                  </h3>

                  <p className="font-body text-charcoal-soft leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <div className="font-body flex items-center gap-2 px-3 py-1.5 bg-cream-warm rounded-full text-xs font-medium text-charcoal-soft/70 border border-gold-rich/10">
                      <MapPin className="w-3 h-3 text-gold-deep" />
                      {job.location}
                    </div>
                    {job.department && (
                      <div className="font-body flex items-center gap-2 px-3 py-1.5 bg-cream-warm rounded-full text-xs font-medium text-charcoal-soft/70 border border-gold-rich/10">
                        <Building className="w-3 h-3 text-gold-deep" />
                        {job.department}
                      </div>
                    )}
                    {job.deadlineAt && (
                      <div className="font-body flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full text-xs font-medium text-red-400 border border-red-100">
                        <Calendar className="w-3 h-3" />
                        Deadline: {new Date(job.deadlineAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom */}
                <div className="px-8 pb-8">
                  <button
                    onClick={() => openApply(job)}
                    className="w-full py-4 bg-green-deep text-off-white font-body font-medium rounded-2xl hover:bg-gold-rich hover:text-green-deep transition-all shadow-lg shadow-green-deep/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group/btn"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Volunteer Section */}
      <section className="py-24 bg-cream-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div className="volunteer-text">
                <p className="font-body text-xs font-medium text-gold-deep uppercase tracking-[0.3em] mb-4">Make a Difference</p>
                <h2 className="font-display text-5xl md:text-6xl font-light text-green-deep tracking-tight leading-[0.9] mb-6">
                  Volunteer With <span className="gold-shimmer-text">Us</span>
                </h2>
                <p className="font-body text-charcoal-soft leading-relaxed text-lg mb-8">
                  Can&apos;t find a suitable role? Join our volunteer program and contribute your skills and time to help us empower the next generation.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: Users, title: "Community Impact", desc: "Directly help students and families in need" },
                    { icon: GraduationCap, title: "Skill Sharing", desc: "Teach, mentor, and guide aspiring professionals" },
                    { icon: Heart, title: "Fulfilling Work", desc: "Experience meaningful work that transforms lives" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-deep text-gold-rich rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-green-deep/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-body font-medium text-green-deep">{title}</p>
                        <p className="font-body text-charcoal-soft/70 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Volunteer Form */}
              <div className="volunteer-form-panel glass-brand rounded-[3rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(26,53,40,0.08)]">
                {volStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-deep rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-deep/30">
                      <CheckCircle className="w-10 h-10 text-gold-rich" />
                    </div>
                    <h3 className="font-display text-2xl font-medium text-green-deep mb-3">Application Received!</h3>
                    <p className="font-body text-charcoal-soft mb-6">
                      Thank you for your interest in volunteering. We&apos;ll be in touch soon!
                    </p>
                    <button
                      onClick={() => setVolStatus("idle")}
                      className="px-6 py-3 bg-green-deep text-off-white font-body font-medium rounded-2xl hover:bg-green-rich transition-all text-sm uppercase tracking-widest"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="font-display text-2xl font-medium text-green-deep mb-2">Volunteer Application</h3>
                    <p className="font-body text-charcoal-soft/60 text-sm mb-8">Join our community of changemakers</p>

                    <form onSubmit={handleVolSubmit} className="space-y-5">
                      {(
                        [
                          { label: "Full Name", name: "name", type: "text", placeholder: "Your full name", required: true },
                          { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com", required: true },
                          { label: "Phone Number", name: "phone", type: "tel", placeholder: "+92 300 0000000" },
                          { label: "Area of Interest", name: "interest", type: "text", placeholder: "e.g. Teaching, Mentoring, Administration" },
                        ] as { label: string; name: keyof VolunteerForm; type: string; placeholder: string; required?: boolean }[]
                      ).map((field) => (
                        <div key={field.name} className="flex flex-col gap-1.5">
                          <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest">
                            {field.label} {field.required && <span className="text-gold-deep">*</span>}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={volForm[field.name]}
                            onChange={(e) => setVolForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="font-body bg-off-white/80 border-2 border-gold-rich/15 rounded-2xl px-5 py-3.5 text-green-deep placeholder:text-charcoal-soft/40 focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all text-sm"
                          />
                        </div>
                      ))}

                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest">
                          Why do you want to volunteer?
                        </label>
                        <textarea
                          name="message"
                          value={volForm.message}
                          onChange={(e) => setVolForm((p) => ({ ...p, message: e.target.value }))}
                          placeholder="Tell us about your motivation..."
                          rows={4}
                          className="font-body bg-off-white/80 border-2 border-gold-rich/15 rounded-2xl px-5 py-3.5 text-green-deep placeholder:text-charcoal-soft/40 focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all text-sm resize-none"
                        />
                      </div>

                      {volStatus === "error" && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <p className="text-red-600 font-body font-medium text-sm">{volError}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={volStatus === "loading"}
                        className="w-full py-4 bg-green-deep text-off-white font-body font-medium rounded-2xl hover:bg-green-rich transition-all shadow-lg shadow-green-deep/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {volStatus === "loading" ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                        ) : (
                          <><Send className="w-4 h-4" /> Submit Application</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green-deep/60 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && setShowApplyModal(false)}
          >
            <motion.div
              ref={applyModalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-off-white rounded-[3rem] p-8 md:p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="font-body text-xs font-medium text-gold-deep uppercase tracking-widest mb-1">Apply For</p>
                  <h3 id="apply-modal-title" className="font-display text-2xl font-medium text-green-deep">{selectedJob.title}</h3>
                  <p className="font-body text-charcoal-soft/60 text-sm mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {selectedJob.location}
                  </p>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-cream-warm hover:bg-gold-rich/20 text-charcoal-soft transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {applyStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-deep rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-gold-rich" />
                  </div>
                  <h4 className="font-display text-2xl font-medium text-green-deep mb-2">Application Submitted!</h4>
                  <p className="font-body text-charcoal-soft/60 mb-6">We&apos;ll review your application and reach out soon.</p>
                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="px-8 py-3 bg-green-deep text-off-white font-body font-medium rounded-2xl hover:bg-green-rich transition-all text-sm uppercase tracking-widest"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-5">
                  {(
                    [
                      { label: "Full Name", name: "applicantName", type: "text", placeholder: "Your full name", required: true },
                      { label: "Email Address", name: "applicantEmail", type: "email", placeholder: "your@email.com", required: true },
                      { label: "Phone Number", name: "applicantPhone", type: "tel", placeholder: "+92 300 0000000" },
                      { label: "Years of Experience", name: "experience", type: "text", placeholder: "e.g. 3 years" },
                      { label: "Education", name: "education", type: "text", placeholder: "e.g. Bachelor's in Management" },
                    ] as { label: string; name: keyof ApplyForm; type: string; placeholder: string; required?: boolean }[]
                  ).map((field, i) => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest">
                        {field.label} {field.required && <span className="text-gold-deep">*</span>}
                      </label>
                      <input
                        ref={i === 0 ? firstApplyFieldRef : undefined}
                        type={field.type}
                        name={field.name}
                        value={applyForm[field.name]}
                        onChange={(e) => setApplyForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="font-body bg-cream-warm border-2 border-gold-rich/15 rounded-2xl px-5 py-3.5 text-green-deep placeholder:text-charcoal-soft/40 focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all text-sm"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs font-medium text-green-deep uppercase tracking-widest">Cover Letter</label>
                    <textarea
                      name="coverLetter"
                      value={applyForm.coverLetter}
                      onChange={(e) => setApplyForm((p) => ({ ...p, coverLetter: e.target.value }))}
                      placeholder="Tell us why you're the right fit..."
                      rows={5}
                      className="font-body bg-cream-warm border-2 border-gold-rich/15 rounded-2xl px-5 py-3.5 text-green-deep placeholder:text-charcoal-soft/40 focus:border-gold-rich focus:ring-4 focus:ring-gold-rich/10 outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  {applyStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <p className="text-red-600 font-body font-medium text-sm">{applyError}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="flex-1 py-4 bg-cream-warm text-charcoal-soft font-body font-medium rounded-2xl hover:bg-gold-rich/20 transition-all text-sm uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={applyStatus === "loading"}
                      className="flex-1 py-4 bg-green-deep text-off-white font-body font-medium rounded-2xl hover:bg-green-rich transition-all shadow-lg shadow-green-deep/20 text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {applyStatus === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Submit</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
