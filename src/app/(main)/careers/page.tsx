import { getPayload } from "payload";
import configPromise from "@payload-config";
import BlocksRenderer from "@/components/BlocksRenderer";
import Image from "next/image";
import { Briefcase, MapPin, Users, GraduationCap, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  let sections = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "careers",
        },
      },
    });

    if (result.docs && result.docs.length > 0) {
      sections = result.docs[0].sections;
    }
  } catch (error) {
    console.error("Failed to fetch careers page from Payload CMS:", error);
  }

  if (sections) {
    return <BlocksRenderer sections={sections as any} />;
  }

  // Fallback: original static layout if database/CMS content is not available
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-darkblue min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lightblue/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lightblue/10 border border-lightblue/20 text-lightblue text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Briefcase className="w-3 h-3" /> Join Our Team
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
            Careers at <span className="gradient-text">Habbah</span>
          </h1>

          <p className="text-yellow/90 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            Be part of a mission-driven team transforming lives through quality education and community support.
          </p>
        </div>
      </section>
    </div>
  );
}
