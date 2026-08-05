import PartnerDetail from "@/components/PartnerDetail";

export default function HunarPartnerPage() {
  return (
    <PartnerDetail
      eyebrow="Habbah Partner"
      title="Hunar"
      accent="Foundation"
      subtitle="One of Pakistan's leading vocational training organisations — where Habbah adds the sha'oor layer to technical skill."
      image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop"
      imageAlt="Vocational training at Hunar Foundation"
      name="Hunar Foundation"
      intro={[
        "Hunar Foundation is one of Pakistan's leading vocational training organisations, serving thousands of students annually — approximately 80% of them girls and women.",
        "Habbah's partnership with Hunar adds the sha'oor layer to Hunar's technical training — the awareness, confidence, and life readiness that converts a skill into a livelihood.",
      ]}
      programmes={[
        {
          title: "Elevated Pathways at Hunar",
          desc: "A 16-week journey across character, professional practice, communication, and self-awareness — building CVs, interview skills, and capstone projects alongside Hunar's technical training.",
          href: "/elevated-pathways",
          cta: "Learn about Elevated Pathways",
          status: "Launching January 2027",
        },
      ]}
      primaryCta={{ label: "Explore Elevated Pathways", href: "/elevated-pathways" }}
    />
  );
}
