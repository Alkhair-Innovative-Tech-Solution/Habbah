import PartnerDetail from "@/components/PartnerDetail";

export default function AlKhairPartnerPage() {
  return (
    <PartnerDetail
      eyebrow="Habbah Partner"
      title="Idara"
      accent="Al Khair"
      subtitle="The community, the trust, the space — an ecosystem of dignity where Habbah's community programmes take root."
      image="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=2000&auto=format&fit=crop"
      imageAlt="Community in Karachi"
      name="Idara Al Khair"
      intro={[
        "Habbah's community programmes run through Idara Al Khair, a trusted institution serving underserved communities in Karachi.",
        "Al Khair provides the ecosystem — the community, the trust, the space — while Habbah enriches the educational layer.",
      ]}
      programmes={[
        {
          title: "Home & Family Care Pathways",
          desc: "Preparing young people — especially women — for dignified livelihoods in home care, early childhood support, and family services. In active development, with pilots launching 2027.",
          href: "/home-family-care",
          cta: "Learn about this programme",
          status: "In development",
        },
        {
          title: "Enriched Community Pathways",
          desc: "Community-rooted learning that layers Habbah's educational guidance onto the support ecosystem Al Khair already provides.",
        },
      ]}
      primaryCta={{ label: "Explore the programme", href: "/home-family-care" }}
    />
  );
}
