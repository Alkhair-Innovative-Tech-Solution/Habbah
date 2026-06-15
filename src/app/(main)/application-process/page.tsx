import { getPayload } from "payload";
import configPromise from "@payload-config";
import BlocksRenderer from "@/components/BlocksRenderer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Users, Search, UserPlus, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ApplicationProcess() {
  let sections = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "application-process",
        },
      },
    });

    if (result.docs && result.docs.length > 0) {
      sections = result.docs[0].sections;
    }
  } catch (error) {
    console.error("Failed to fetch application-process page from Payload CMS:", error);
  }

  if (sections) {
    return <BlocksRenderer sections={sections as any} />;
  }

  // Fallback: original static layout if database/CMS content is not available
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden bg-darkblue">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop"
            alt="Success background"
            fill
            className="object-cover object-top opacity-50 brightness-[0.6]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-darkblue/60 via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-lightblue/10 backdrop-blur-md border border-lightblue/20 text-lightblue text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Step by Step Guide
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter text-shadow-lg">
              Application <span className="gradient-text">Process</span>
            </h1>
  
            <p className="text-lg md:text-2xl text-yellow max-w-2xl mx-auto leading-relaxed font-black text-shadow-lg uppercase tracking-wide">
              Transparent and straightforward steps to becoming a Habbah Club beneficiary.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
