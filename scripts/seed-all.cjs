const { Client } = require("pg");
const crypto = require("crypto");

// =========================================================================
// PAYLOAD PASSWORD HASHING
// =========================================================================
function generateSalt() {
  return crypto.randomBytes(32).toString("hex");
}
function generateHash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 25000, 512, "sha256").toString("hex");
}

// =========================================================================
// SEED DATA FOR 7 HABBAH PAGES
// =========================================================================
const pages = [
  // ============================== HOME ==============================
  {
    title: "Home",
    slug: "home",
    seo_meta_title: "Habbah – Empowering Communities Through Education",
    seo_meta_description: "Habbah provides interest-free loans, scholarships, mentorship, and career guidance to uplift communities.",
    sections: [
      {
        blockType: "hero",
        badge: "Welcome to Habbah",
        title: "Empowering Communities Through Education",
        subtitle: "We provide interest-free loans, scholarships, mentorship, and career guidance to help individuals achieve their full potential.",
        highlightWord: "Education",
        cta: { label: "Get Started", link: "/application-process" },
        stats: [
          { value: "$500K+", label: "Disbursed Loans" },
          { value: "200+", label: "Scholarship Recipients" },
          { value: "1,000+", label: "Lives Impacted" },
        ],
        backgroundType: "darkblue",
      },
      {
        blockType: "stats",
        badge: "Our Impact",
        title: "Making a Difference Together",
        stats: [
          { value: "$500K+", label: "Interest-Free Loans" },
          { value: "200+", label: "Scholarships Awarded" },
          { value: "50+", label: "Mentorship Pairs" },
          { value: "95%", label: "Success Rate" },
        ],
        layout: "grid",
      },
      {
        blockType: "cta",
        title: "Ready to Start Your Journey?",
        description: "Apply today and take the first step toward achieving your goals with our support.",
        button: { label: "Apply Now", link: "/application-process" },
        backgroundType: "dark",
      },
      {
        blockType: "partners",
        badge: "Our Partners",
        title: "Organizations That Support Our Mission",
        partners: [
          { name: "Community Foundation" },
          { name: "Education Alliance" },
          { name: "Local Business Council" },
        ],
      },
    ],
  },

  // ============================== ABOUT ==============================
  {
    title: "About Us",
    slug: "about",
    seo_meta_title: "About Habbah – Our Mission & Team",
    seo_meta_description: "Learn about Habbah's mission to empower communities through education, interest-free loans, and mentorship programs.",
    sections: [
      {
        blockType: "hero",
        badge: "About Habbah",
        title: "Our Mission",
        subtitle: "We believe in empowering individuals through accessible education and financial support, creating lasting change in our communities.",
        highlightWord: "Mission",
        backgroundType: "darkblue",
      },
      {
        blockType: "team",
        badge: "Our Team",
        title: "Meet the People Behind Habbah",
        members: [
          { name: "Sarah Ahmed", role: "Executive Director" },
          { name: "Omar Hassan", role: "Programs Manager" },
          { name: "Layla Khan", role: "Finance Lead" },
          { name: "Zayn Ali", role: "Community Outreach" },
        ],
      },
      {
        blockType: "stats",
        badge: "By the Numbers",
        title: "Our Reach & Impact",
        stats: [
          { value: "5+", label: "Years of Service" },
          { value: "3", label: "Core Programs" },
          { value: "15+", label: "Team Members" },
          { value: "100%", label: "Volunteer-Driven" },
        ],
        layout: "row",
      },
    ],
  },

  // ============================== APPLICATION PROCESS ==============================
  {
    title: "Application Process",
    slug: "application-process",
    seo_meta_title: "Application Process – Habbah Programs",
    seo_meta_description: "Follow our step-by-step application process for interest-free loans, scholarships, and mentorship programs.",
    sections: [
      {
        blockType: "hero",
        badge: "How It Works",
        title: "Simple Steps to Get Started",
        subtitle: "Our transparent process ensures you receive the support you need, every step of the way.",
        highlightWord: "Simple",
        backgroundType: "darkblue",
      },
      {
        blockType: "timeline",
        badge: "The Process",
        title: "Your Journey With Habbah",
        steps: [
          { stepNumber: "1", title: "Submit Application", description: "Fill out our online application with your details and program of interest.", icon: "FileText" },
          { stepNumber: "2", title: "Initial Review", description: "Our team reviews your application within 5-7 business days.", icon: "Search" },
          { stepNumber: "3", title: "Interview", description: "Qualified candidates are invited for a brief interview.", icon: "Calendar" },
          { stepNumber: "4", title: "Approval & Onboarding", description: "Receive your approval and begin your journey with Habbah.", icon: "CheckCircle" },
        ],
      },
      {
        blockType: "cta",
        title: "Ready to Apply?",
        description: "Take the first step toward achieving your goals.",
        button: { label: "Start Your Application", link: "/contact" },
        backgroundType: "light",
      },
    ],
  },

  // ============================== SUCCESS STORIES ==============================
  {
    title: "Success Stories",
    slug: "success-stories",
    seo_meta_title: "Success Stories – Habbah Impact",
    seo_meta_description: "Read inspiring success stories from individuals whose lives have been transformed through Habbah's programs.",
    sections: [
      {
        blockType: "hero",
        badge: "Success Stories",
        title: "Transforming Lives, One Story at a Time",
        subtitle: "Hear from individuals whose lives have been changed through our programs.",
        highlightWord: "Transforming",
        backgroundType: "darkblue",
      },
      {
        blockType: "testimonials",
        badge: "Testimonials",
        title: "What Our Community Says",
        description: "Real stories from real people whose lives have been impacted by Habbah.",
        testimonials: [
          { name: "Fatima Yusuf", role: "Scholarship Recipient", quote: "Habbah's scholarship program allowed me to pursue my degree in engineering. I'm now working as a project manager and giving back to my community." },
          { name: "Ahmed Rahim", role: "Loan Recipient", quote: "The interest-free loan from Habbah helped me start my small business. Today, I employ 5 people and am expanding." },
          { name: "Maria Khan", role: "Mentorship Program", quote: "My mentor through Habbah guided me through career transitions and helped me land my dream job in tech." },
        ],
      },
      {
        blockType: "cta",
        title: "Share Your Story",
        description: "Have you been impacted by Habbah? We'd love to hear from you.",
        button: { label: "Share Your Story", link: "/contact" },
        backgroundType: "dark",
      },
    ],
  },

  // ============================== CONTACT ==============================
  {
    title: "Contact Us",
    slug: "contact",
    seo_meta_title: "Contact Habbah – Get in Touch",
    seo_meta_description: "Contact Habbah for inquiries about our programs, partnerships, or general questions.",
    sections: [
      {
        blockType: "hero",
        badge: "Get in Touch",
        title: "We'd Love to Hear From You",
        subtitle: "Have questions about our programs or want to get involved? Reach out to us.",
        highlightWord: "Hear",
        backgroundType: "darkblue",
      },
      {
        blockType: "contact-form",
        title: "Send Us a Message",
        description: "Fill out the form below and we'll get back to you within 2-3 business days.",
        fields: [
          { label: "Full Name", name: "name", type: "text", required: true, placeholder: "Your full name" },
          { label: "Email Address", name: "email", type: "email", required: true, placeholder: "your@email.com" },
          { label: "Phone Number", name: "phone", type: "tel", required: false, placeholder: "+1 (555) 123-4567" },
          { label: "Subject", name: "subject", type: "text", required: true, placeholder: "How can we help?" },
          { label: "Message", name: "message", type: "textarea", required: true, placeholder: "Your message..." },
        ],
        submitLabel: "Send Message",
      },
      {
        blockType: "map-section",
        title: "Visit Us",
        address: "123 Community Street, Suite 100, Anytown, USA 12345",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095914967!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1",
        contacts: [
          { label: "Phone", value: "+1 (555) 123-4567" },
          { label: "Email", value: "info@habbah.org" },
          { label: "Hours", value: "Mon-Fri: 9AM - 5PM" },
        ],
      },
    ],
  },

  // ============================== CAREERS ==============================
  {
    title: "Careers",
    slug: "careers",
    seo_meta_title: "Careers at Habbah – Join Our Team",
    seo_meta_description: "Explore career opportunities at Habbah and join our mission to empower communities through education.",
    sections: [
      {
        blockType: "hero",
        badge: "Careers",
        title: "Join Our Mission-Driven Team",
        subtitle: "Help us empower communities through education and financial support.",
        highlightWord: "Join",
        backgroundType: "darkblue",
      },
      {
        blockType: "jobs-section",
        badge: "Open Positions",
        title: "Current Job Openings",
        description: "Explore opportunities to make a difference in your community.",
        emptyMessage: "No open positions at this time. Please check back later.",
      },
      {
        blockType: "cta",
        title: "Don't See the Right Role?",
        description: "We're always looking for talented individuals. Send us your resume.",
        button: { label: "Contact Us", link: "/contact" },
        backgroundType: "light",
      },
    ],
  },

  // ============================== VOLUNTEER ==============================
  {
    title: "Volunteer",
    slug: "volunteer",
    seo_meta_title: "Volunteer With Habbah – Make a Difference",
    seo_meta_description: "Join Habbah as a volunteer and help empower communities through education, mentorship, and more.",
    sections: [
      {
        blockType: "hero",
        badge: "Volunteer",
        title: "Make a Difference – Volunteer With Us",
        subtitle: "Your time and skills can transform lives. Join our community of dedicated volunteers.",
        highlightWord: "Difference",
        cta: { label: "Sign Up to Volunteer", link: "/volunteer" },
        backgroundType: "darkblue",
      },
      {
        blockType: "text",
        badge: "Why Volunteer?",
        title: "Why Volunteer With Habbah?",
        content: [
          { children: [{ text: "Volunteering with Habbah is an opportunity to give back to your community while developing new skills. Whether you're a professional looking to mentor someone in your field, a student seeking experience, or someone who simply wants to help, we have a place for you." }] },
          { children: [{ text: "Our volunteers are the backbone of our organization. From tutoring and mentoring to fundraising and event planning, every contribution makes a lasting impact." }] },
        ],
        layout: "centered",
        background: "lightblue",
      },
      {
        blockType: "cards-grid",
        badge: "Volunteer Roles",
        title: "Ways to Get Involved",
        description: "Choose a volunteer role that matches your skills and interests.",
        cards: [
          { title: "Mentor", description: "Guide and support individuals in your field of expertise.", icon: "UserCheck" },
          { title: "Tutor", description: "Help students achieve their academic goals.", icon: "BookOpen" },
          { title: "Event Coordinator", description: "Help plan and execute community events.", icon: "Calendar" },
          { title: "Fundraising", description: "Support our fundraising efforts and campaigns.", icon: "Heart" },
        ],
        columns: "2",
      },
      {
        blockType: "cta",
        title: "Ready to Get Started?",
        description: "Sign up today and become part of something meaningful.",
        button: { label: "Volunteer Now", link: "/volunteer" },
        backgroundType: "dark",
      },
    ],
  },
];

// =========================================================================
// MAIN SEED FUNCTION
// =========================================================================
async function main() {
  const email = process.argv[2] || "admin@habbah.org";
  const password = process.argv[3] || "Admin123!";
  const name = process.argv[4] || "Super Admin";

  const client = new Client({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:password@localhost:5499/habbah_db",
  });
  await client.connect();

  // --- Create or verify admin user ---
  const userExists = await client.query(
    "SELECT id, email FROM payload.users WHERE email = $1",
    [email]
  );

  let userId;
  if (userExists.rows.length > 0) {
    userId = userExists.rows[0].id;
    console.log(`User ${email} already exists (id=${userId})`);
  } else {
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    const user = await client.query(
      `       INSERT INTO payload.users (email, "role", name, salt, hash, login_attempts, updated_at, created_at)
       VALUES ($1, 'super_admin', $2, $3, $4, 0, NOW(), NOW())
       RETURNING id`,
      [email, name, salt, hash]
    );
    userId = user.rows[0].id;
    console.log(`Created admin user: ${email} (id=${userId})`);
  }

  // --- Create pages ---
  for (const page of pages) {
    const existing = await client.query(
      "SELECT id FROM payload.pages WHERE slug = $1",
      [page.slug]
    );
    if (existing.rows.length > 0) {
      console.log(`Page "${page.title}" (/${page.slug}) already exists (id=${existing.rows[0].id})`);
      continue;
    }

    await client.query(
      `INSERT INTO payload.pages (title, slug, seo_meta_title, seo_meta_description, sections, updated_at, created_at)
       VALUES ($1, $2, $3, $4, $5::jsonb, NOW(), NOW())`,
      [
        page.title,
        page.slug,
        page.seo_meta_title || null,
        page.seo_meta_description || null,
        JSON.stringify(page.sections),
      ]
    );
    console.log(`Created page: "${page.title}" (/${page.slug})`);
  }

  console.log("\nSeed complete! Log in at http://localhost:3000/cms-admin");
  console.log(`Email: ${email}`);
  await client.end();
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
