import PartnerDetail from "@/components/PartnerDetail";

export default function GenerationsPartnerPage() {
  return (
    <PartnerDetail
      eyebrow="Habbah Partner"
      title="Generations"
      accent="School"
      subtitle="The founding home of Habbah — the school community where the trust first took root."
      image="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000&auto=format&fit=crop"
      imageAlt="School building"
      name="Generations School"
      intro={[
        "Habbah operates from Generation's School's South Campus in SITE, Karachi.",
        "Generations School has been the founding home of Habbah since the trust's inception — a partner whose values of care and excellence have shaped everything Habbah does.",
      ]}
      programmes={[
        {
          title: "Habbah's Founding Home",
          desc: "Our office and all interactions with Habbah members and associates are based at Generation's School South Campus, SITE, Karachi.",
        },
      ]}
      note={{
        label: "Our office",
        text: "Generation's School South Campus,\nSITE, Karachi",
      }}
      primaryCta={{ label: "Visit our office", href: "/contact" }}
    />
  );
}
