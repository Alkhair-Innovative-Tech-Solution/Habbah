/**
 * Payload CMS – onInit Seeder
 * ============================
 * Called from payload.config.ts > onInit().
 *
 * Does two things:
 *  1. Creates the first CMS super-admin user (if no users exist).
 *  2. Seeds all 7 website pages with rich initial block content.
 *
 * Uses overrideAccess: true so it works without an authenticated session.
 * Fully idempotent — safe to run on every app restart.
 */

import type { Payload } from "payload";

// ── Rich Text Helper ───────────────────────────────────────────────────────

function lexicalRoot(text: string) {
  return {
    root: {
      type: "root" as const,
      children: [
        {
          type: "paragraph" as const,
          children: [{ type: "text" as const, text, version: 1 }],
          direction: "ltr" as const,
          format: "" as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

// ── Page Definitions ───────────────────────────────────────────────────────

function buildPages() {
  return [
    // ══ HOME ══════════════════════════════════════════════════════════════
    {
      title: "Home",
      slug: "home",
      seo: {
        metaTitle: "Habbah Educational Trust – Building Futures Through Education",
        metaDescription:
          "Habbah Educational Trust provides interest-free student loans for undergraduate degree programmes, empowering the next generation of leaders in Pakistan.",
      },
      sections: [
        {
          blockType: "hero",
          badge: "Sponsored by Generations School",
          title: "Building Futures Through Education",
          highlightWord: "Futures",
          subtitle:
            "Habbah Educational Trust provides interest-free student loans for undergraduate degree programmes, empowering the next generation of leaders.",
          cta: { label: "Start Your Journey", link: "/contact" },
          backgroundType: "darkblue",
          stats: [
            { value: "500+", label: "Students Funded" },
            { value: "0%", label: "Interest Rate" },
            { value: "95%", label: "Repayment Rate" },
          ],
        },
        {
          blockType: "cards-grid",
          badge: "Our Strengths",
          title: "Why Choose Habbah",
          description:
            "Discover how we support students in achieving their academic dreams through a sustainable and trust-based model.",
          columns: "3",
          cards: [
            {
              title: "Convenient Repayment",
              description:
                "Interest-free loans with flexible repayment plans tailored to your financial situation.",
              icon: "HandCoins",
            },
            {
              title: "Tailored Loan Programmes",
              description:
                "Specialized financial support for various undergraduate degrees in top universities.",
              icon: "GraduationCap",
            },
            {
              title: "Guidance & Counselling",
              description:
                "Professional mentorship and career advice to help you navigate your educational journey.",
              icon: "UserRoundCheck",
            },
          ],
        },
        {
          blockType: "stats",
          badge: "Our Impact",
          title: "Transforming Lives Through Education",
          layout: "row",
          stats: [
            { value: "500+", label: "Students Funded" },
            { value: "PKR 50M+", label: "Loans Disbursed" },
            { value: "20+", label: "Partner Universities" },
            { value: "95%", label: "Repayment Rate" },
          ],
        },
        {
          blockType: "partners",
          badge: "Trusted Partners",
          title: "Universities We Work With",
          partners: [
            { name: "FAST NUCES" },
            { name: "Aga Khan University" },
            { name: "NED University" },
            { name: "IBA Karachi" },
          ],
        },
        {
          blockType: "cta",
          title: "Ready to Transform Your Future?",
          description:
            "Join hundreds of students who have achieved their dreams with Habbah's support. Apply today.",
          button: { label: "Apply Now", link: "/application-process" },
          backgroundType: "dark",
        },
      ],
    },

    // ══ ABOUT ═════════════════════════════════════════════════════════════
    {
      title: "About Us",
      slug: "about",
      seo: {
        metaTitle: "About Habbah Educational Trust – Our Mission & Story",
        metaDescription:
          "Learn about Habbah Educational Trust, our mission to provide interest-free education loans in Pakistan.",
      },
      sections: [
        {
          blockType: "hero",
          badge: "Learn Our Story",
          title: "Empowering Pakistan's Future Leaders",
          highlightWord: "Future",
          subtitle:
            "Habbah Educational Trust is dedicated to assisting deserving students in Pakistan by providing financial support for their bachelor's degree programmes.",
          backgroundType: "darkblue",
        },
        {
          blockType: "text",
          badge: "Our Foundation",
          title: "The Verse That Guides Us",
          layout: "centered",
          background: "lightblue",
          content: lexicalRoot(
            '"The likeness of those who spend their wealth in the way of Allah, is as the likeness of a grain (of corn); it grows seven ears, and each ear has a hundred grains. Allah gives manifold increase to whom He wills." — Surah Al-Baqarah 2:261'
          ),
        },
        {
          blockType: "cards-grid",
          badge: "Core Values",
          title: "What Drives Us",
          description:
            "Our foundation is built on trust, integrity, and a genuine desire to see students succeed.",
          columns: "3",
          cards: [
            {
              title: "Interest-Free Commitment",
              description:
                "We offer 100% Riba-free financial support, staying true to Islamic principles of generosity and brotherhood.",
              icon: "Heart",
            },
            {
              title: "Transparency",
              description:
                "Every rupee is accounted for. We maintain the highest standards of financial transparency.",
              icon: "Eye",
            },
            {
              title: "Community Impact",
              description:
                "We invest in the future leaders, doctors, engineers, and entrepreneurs of Pakistan.",
              icon: "Users",
            },
          ],
        },
        {
          blockType: "team",
          badge: "Our Leadership",
          title: "The Team Behind Habbah",
          members: [
            { name: "Dr. Ahmed Khan", role: "Chairman & Founder" },
            { name: "Ms. Fatima Malik", role: "Executive Director" },
            { name: "Mr. Hassan Siddiqui", role: "Head of Finance" },
          ],
        },
        {
          blockType: "cta",
          title: "Join Our Mission",
          description:
            "Whether you are a student seeking support or a donor wanting to make a difference — Habbah is your platform.",
          button: { label: "Get Involved", link: "/contact" },
          backgroundType: "dark",
        },
      ],
    },

    // ══ APPLICATION PROCESS ═══════════════════════════════════════════════
    {
      title: "Application Process",
      slug: "application-process",
      seo: {
        metaTitle: "How to Apply – Habbah Educational Trust",
        metaDescription:
          "Step-by-step guide to applying for an interest-free student loan from Habbah Educational Trust.",
      },
      sections: [
        {
          blockType: "hero",
          badge: "Step by Step Guide",
          title: "Your Path to Educational Funding",
          highlightWord: "Funding",
          subtitle:
            "Transparent and straightforward steps to becoming a Habbah Club beneficiary.",
          cta: { label: "Apply Now", link: "/contact" },
          backgroundType: "darkblue",
        },
        {
          blockType: "timeline",
          badge: "Application Steps",
          title: "How to Apply",
          steps: [
            {
              stepNumber: "01",
              icon: "FileText",
              title: "Submit Application",
              description:
                "Complete and submit the online application form with your personal details, academic records, and financial background.",
            },
            {
              stepNumber: "02",
              icon: "Search",
              title: "Document Review",
              description:
                "Our team reviews your application, academic history, and financial need assessment to evaluate eligibility.",
            },
            {
              stepNumber: "03",
              icon: "Users",
              title: "Interview",
              description:
                "Shortlisted candidates are invited for a personal interview to discuss their goals and repayment plan.",
            },
            {
              stepNumber: "04",
              icon: "CheckCircle",
              title: "Loan Approval & Disbursement",
              description:
                "Approved candidates receive their loan disbursement directly to their university account, semester by semester.",
            },
            {
              stepNumber: "05",
              icon: "GraduationCap",
              title: "Graduate & Repay",
              description:
                "After graduation, repayments begin on a flexible schedule, helping the next generation of students.",
            },
          ],
        },
        {
          blockType: "cards-grid",
          badge: "Eligibility",
          title: "Who Can Apply?",
          description: "We welcome applications from students who meet the following criteria.",
          columns: "3",
          cards: [
            {
              title: "Pakistani National",
              description:
                "Must be a Pakistani citizen currently enrolled or seeking admission in an accredited university.",
              icon: "Flag",
            },
            {
              title: "Undergraduate Level",
              description:
                "Funding is available for bachelor's degree programmes across all disciplines.",
              icon: "BookOpen",
            },
            {
              title: "Financial Need",
              description:
                "Priority is given to students from low to middle-income households who demonstrate genuine financial need.",
              icon: "HandCoins",
            },
          ],
        },
        {
          blockType: "cta",
          title: "Ready to Apply?",
          description:
            "Take the first step towards funding your education. Our team is here to guide you every step of the way.",
          button: { label: "Start Application", link: "/contact" },
          backgroundType: "dark",
        },
      ],
    },

    // ══ SUCCESS STORIES ═══════════════════════════════════════════════════
    {
      title: "Success Stories",
      slug: "success-stories",
      seo: {
        metaTitle: "Success Stories – Habbah Student Beneficiaries",
        metaDescription:
          "Meet the students whose lives were transformed by Habbah Educational Trust's interest-free loans.",
      },
      sections: [
        {
          blockType: "hero",
          badge: "Real Impact, Real Lives",
          title: "Stories of Transformation",
          highlightWord: "Transformation",
          subtitle:
            "Meet the brilliant minds who transformed their lives with the support of Habbah.",
          backgroundType: "darkblue",
        },
        {
          blockType: "stats",
          title: "Our Impact by the Numbers",
          layout: "row",
          stats: [
            { value: "500+", label: "Students Funded" },
            { value: "30+", label: "Universities" },
            { value: "PKR 50M+", label: "Disbursed" },
            { value: "95%", label: "Repayment Rate" },
          ],
        },
        {
          blockType: "testimonials",
          badge: "Beneficiary Stories",
          title: "Words From Our Students",
          description:
            "Hear directly from students whose lives were changed by Habbah's support.",
          testimonials: [
            {
              name: "Ali Hassan",
              role: "Software Engineer – FAST NUCES Graduate",
              quote:
                "Habbah's loan allowed me to complete my CS degree without burdening my family. Today I'm earning enough to repay the loan and fund my sibling's education too.",
            },
            {
              name: "Sara Ahmed",
              role: "Doctor – Aga Khan University Graduate",
              quote:
                "I always dreamed of becoming a doctor but thought it was impossible with my family's financial situation. Habbah made that dream a reality.",
            },
            {
              name: "Usman Tariq",
              role: "Civil Engineer – NED University Graduate",
              quote:
                "The interest-free nature of the loan was a blessing. I focused entirely on my studies knowing I wasn't accumulating interest debt.",
            },
          ],
        },
        {
          blockType: "cta",
          title: "Your Success Story Starts Here",
          description:
            "Join the growing family of Habbah beneficiaries who are building a better Pakistan.",
          button: { label: "Apply for Funding", link: "/application-process" },
          backgroundType: "dark",
        },
      ],
    },

    // ══ CONTACT ═══════════════════════════════════════════════════════════
    {
      title: "Contact",
      slug: "contact",
      seo: {
        metaTitle: "Contact Habbah Educational Trust",
        metaDescription:
          "Get in touch with Habbah Educational Trust for student loan enquiries, partnerships, or general information.",
      },
      sections: [
        {
          blockType: "hero",
          badge: "Get In Touch",
          title: "Contact Habbah",
          highlightWord: "Habbah",
          subtitle:
            "Unlock the door to quality education and a brighter future. Our team is ready to help.",
          backgroundType: "darkblue",
        },
        {
          blockType: "contact-form",
          title: "Send Us a Message",
          description:
            "Fill in the form below and our team will get back to you within 24 hours.",
          submitLabel: "Send Message",
          fields: [
            { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
            { name: "email", label: "Email Address", type: "email", required: true, placeholder: "your@email.com" },
            { name: "subject", label: "Subject", type: "text", required: false, placeholder: "How can we help?" },
            { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Tell us more..." },
          ],
        },
        {
          blockType: "map-section",
          title: "Visit Our Office",
          address: "Generations School Campus, Karachi, Pakistan",
          embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.5678!2d67.0099!3d24.8615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e8c5c27cfaf%3A0xe96c5ef5700476a5!2sGenerations+School!5e0!3m2!1sen!2spk!4v1686000000000!5m2!1sen!2spk",
          contacts: [
            { label: "Phone", value: "+92 21 1234 5678" },
            { label: "Email", value: "info@habbah.com" },
            { label: "Hours", value: "Mon–Fri, 9am–5pm" },
          ],
        },
      ],
    },

    // ══ CAREERS ═══════════════════════════════════════════════════════════
    {
      title: "Careers",
      slug: "careers",
      seo: {
        metaTitle: "Careers at Habbah Educational Trust",
        metaDescription:
          "Join the Habbah team and be part of a mission to transform education in Pakistan.",
      },
      sections: [
        {
          blockType: "hero",
          badge: "Join Our Team",
          title: "Careers at Habbah",
          highlightWord: "Habbah",
          subtitle:
            "Be part of a mission-driven team transforming lives through quality education and community support.",
          cta: { label: "View Open Positions", link: "#jobs" },
          backgroundType: "darkblue",
        },
        {
          blockType: "cards-grid",
          badge: "Why Work With Us",
          title: "Life at Habbah",
          description: "We offer more than a job — we offer a purpose.",
          columns: "3",
          cards: [
            {
              title: "Purposeful Work",
              description:
                "Every project you work on directly impacts the lives of students and families across Pakistan.",
              icon: "Heart",
            },
            {
              title: "Growth & Learning",
              description:
                "We invest in our team's development through training, mentorship, and continuous learning opportunities.",
              icon: "TrendingUp",
            },
            {
              title: "Collaborative Culture",
              description:
                "Join a diverse, passionate team that values your ideas and celebrates achievements together.",
              icon: "Users",
            },
          ],
        },
        {
          blockType: "cta",
          title: "Don't See a Suitable Role?",
          description:
            "We're always looking for talented individuals. Send us your resume and we'll be in touch.",
          button: { label: "Send Open Application", link: "/contact" },
          backgroundType: "dark",
        },
      ],
    },

    // ══ VOLUNTEER ═════════════════════════════════════════════════════════
    {
      title: "Volunteer",
      slug: "volunteer",
      seo: {
        metaTitle: "Volunteer with Habbah Educational Trust",
        metaDescription:
          "Give back to your community by volunteering with Habbah. Support students and help build a better Pakistan.",
      },
      sections: [
        {
          blockType: "hero",
          badge: "Make a Difference",
          title: "Volunteer With Habbah",
          highlightWord: "Habbah",
          subtitle:
            "Join our volunteer program and contribute your skills and time to help us empower the next generation.",
          cta: { label: "Become a Volunteer", link: "/contact" },
          backgroundType: "darkblue",
        },
        {
          blockType: "cards-grid",
          badge: "Volunteer Roles",
          title: "How You Can Help",
          description: "There are many ways to contribute your time and expertise.",
          columns: "3",
          cards: [
            {
              title: "Student Mentorship",
              description:
                "Guide students through their academic journey, career planning, and personal development.",
              icon: "GraduationCap",
            },
            {
              title: "Financial Literacy",
              description:
                "Teach students about budgeting, responsible borrowing, and financial planning.",
              icon: "PiggyBank",
            },
            {
              title: "Outreach & Awareness",
              description:
                "Help spread the word about Habbah to communities, schools, and universities across Pakistan.",
              icon: "Megaphone",
            },
            {
              title: "Application Support",
              description:
                "Assist students in completing their loan applications and preparing for interviews.",
              icon: "FileText",
            },
            {
              title: "IT & Digital",
              description:
                "Support our digital infrastructure, website, and communications with your tech skills.",
              icon: "Laptop",
            },
            {
              title: "Event Organisation",
              description:
                "Help plan and run our events, workshops, and community engagement programmes.",
              icon: "Calendar",
            },
          ],
        },
        {
          blockType: "stats",
          title: "Our Volunteer Community",
          layout: "row",
          stats: [
            { value: "100+", label: "Active Volunteers" },
            { value: "5,000+", label: "Hours Contributed" },
            { value: "15+", label: "Cities Covered" },
            { value: "500+", label: "Students Mentored" },
          ],
        },
        {
          blockType: "cta",
          title: "Ready to Give Back?",
          description:
            "Volunteering with Habbah is one of the most impactful things you can do. Sign up today and make a real difference.",
          button: { label: "Register as Volunteer", link: "/contact" },
          backgroundType: "dark",
        },
      ],
    },
  ];
}

// ── Step 1: Create first admin user if none exist ──────────────────────────

async function ensureAdminUser(payload: Payload): Promise<void> {
  try {
    const existingUsers = await payload.find({
      collection: "users",
      limit: 1,
      overrideAccess: true,
    });

    if (existingUsers.totalDocs > 0) {
      payload.logger.info("[CMS Seeder] Admin user already exists — skipping user creation.");
      return;
    }

    const email = process.env.CMS_ADMIN_EMAIL || "admin@habbah.com";
    const password = process.env.CMS_ADMIN_PASSWORD || "Habbah@Admin2026!";
    const name = "Habbah Super Admin";

    await payload.create({
      collection: "users",
      data: { name, email, password, role: "super_admin" },
      overrideAccess: true,
    });

    payload.logger.info(`✅ [CMS Seeder] Created first CMS admin user: ${email}`);
    payload.logger.info(`   Password: ${password}`);
    payload.logger.info(`   Please change this password after first login!`);
  } catch (err: any) {
    payload.logger.error(`[CMS Seeder] Error creating admin user: ${err?.message}`);
  }
}

// ── Step 2: Seed pages ─────────────────────────────────────────────────────

async function seedPages(payload: Payload): Promise<void> {
  const pages = buildPages();
  let created = 0;
  let skipped = 0;

  for (const pageData of pages) {
    try {
      const existing = await payload.find({
        collection: "pages",
        where: { slug: { equals: pageData.slug } },
        limit: 1,
        overrideAccess: true,
        depth: 0,
      });

      if (existing.totalDocs > 0) {
        payload.logger.info(`  ⏭  [CMS Seeder] "${pageData.title}" already exists — skipping`);
        skipped++;
        continue;
      }

      await payload.create({
        collection: "pages",
        data: pageData as any,
        overrideAccess: true,
      });

      payload.logger.info(`  ✅ [CMS Seeder] Created page: "${pageData.title}"`);
      created++;
    } catch (err: any) {
      payload.logger.error(`  ❌ [CMS Seeder] Failed to seed "${pageData.title}": ${err?.message}`);
    }
  }

  payload.logger.info(
    `[CMS Seeder] Pages done — Created: ${created}, Skipped: ${skipped}`
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export async function seedCmsPages(payload: Payload): Promise<void> {
  payload.logger.info("🌱 [CMS Seeder] Initializing...");
  await ensureAdminUser(payload);
  await seedPages(payload);
  payload.logger.info("🎉 [CMS Seeder] Complete! Visit /cms-admin to manage your content.");
}
