import { getPayload } from "payload";
import configPromise from "@payload-config";
import BlocksRenderer from "@/components/BlocksRenderer";
import Image from "next/image";
import { Quote, MapPin, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function About() {
  let sections = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "about",
        },
      },
    });

    if (result.docs && result.docs.length > 0) {
      sections = result.docs[0].sections;
    }
  } catch (error) {
    console.error("Failed to fetch about page from Payload CMS:", error);
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
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
            alt="Students collaborating"
            fill
            className="object-cover object-bottom opacity-50 brightness-[0.6]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-darkblue/60 via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-lightblue/10 backdrop-blur-md border border-lightblue/20 text-lightblue text-xs font-black uppercase tracking-[0.2em] mb-8">
              Learn Our Story
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter text-shadow-lg">
              About About
            </h1>

            <p className="text-lg md:text-2xl text-yellow max-w-2xl mx-auto leading-relaxed font-black text-shadow-lg uppercase tracking-wide">
              Habbah Educational Trust is dedicated to assisting deserving students in Pakistan by providing financial support for their bachelor's degree programmes.
            </p>
          </div>
        </div>
      </section>

      {/* Quranic Verse Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-[3rem] overflow-hidden min-h-[400px] shadow-2xl border-4 border-white group">
            <Image 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"
              alt="Nature representing growth"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>

          <div className="glass p-12 md:p-16 rounded-[3rem] flex flex-col justify-center relative overflow-hidden group">
            <Quote className="w-16 h-16 text-yellow/20 absolute top-8 right-8 rotate-12" />
            <div className="space-y-6 relative z-10">
              <p className="text-xl md:text-2xl font-bold text-darkblue italic leading-relaxed">
                "The likeness of those who spend their wealth in the way of Allah, is as the likeness of a grain (of corn); it grows seven ears, and each ear has a hundred grains. Allah gives manifold increase to whom He wills."
              </p>
              <div className="w-16 h-1 bg-yellow" />
              <div>
                <p className="text-lightblue font-black uppercase tracking-[0.2em] text-xs mb-1">The Noble Qu'ran</p>
                <p className="text-darkblue font-black text-lg">Surah Al-Baqarah 2:261</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
