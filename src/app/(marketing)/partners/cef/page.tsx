import PartnerDetail from "@/components/PartnerDetail";

export default function CefPartnerPage() {
  return (
    <PartnerDetail
      eyebrow="Habbah Partner"
      title="CEF —"
      accent="Character Education Foundation"
      subtitle="A partner in formation-focused work — building character into the architecture of how young people learn."
      image="https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=2000&auto=format&fit=crop"
      imageAlt="Students in focused discussion"
      name="CEF — Character Education Foundation"
      intro={[
        "CEF — Character Education Foundation — is Habbah's partner in formation-focused initiatives, where character education is built into the fabric of learning itself.",
      ]}
      programmes={[
        {
          title: "The Better Question — A Compass Fellowship",
          desc: "A formation-focused fellowship that helps young people orient themselves — knowing what they are serving, and why it matters.",
          status: "In development — pilot planned 2027",
        },
        {
          title: "ACE Foundational Curriculum Architecture",
          desc: "Building character education into foundational curriculum, so the values Habbah lives by become part of how students learn.",
          status: "In development — pilot planned 2027",
        },
      ]}
      primaryCta={{ label: "Reach out to learn more", href: "/contact" }}
    />
  );
}
