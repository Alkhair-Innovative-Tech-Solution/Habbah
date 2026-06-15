import { getPayload } from "payload";
import configPromise from "@payload-config";
import BlocksRenderer from "@/components/BlocksRenderer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandCoins, GraduationCap, UserRoundCheck, Users, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  let sections = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "home",
        },
      },
    });

    if (result.docs && result.docs.length > 0) {
      sections = result.docs[0].sections;
    }
  } catch (error) {
    console.error("Failed to fetch home page from Payload CMS:", error);
  }

  if (sections) {
    return <BlocksRenderer sections={sections as any} />;
  }

  // Fallback: original static layout if database/CMS content is not available
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-20 overflow-hidden bg-darkblue">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
            alt="Wheat field background"
            fill
            className="object-cover brightness-[0.35] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-darkblue/40 via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-lightblue/10 backdrop-blur-md border border-lightblue/20 text-lightblue text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Sponsored by Generations School
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter text-shadow-lg">
              Building <span className="gradient-text">Futures</span> <span className="text-yellow whitespace-nowrap">Through Education</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed font-semibold text-shadow-lg">
              Habbah Educational Trust provides interest-free student loans for undergraduate degree programmes, empowering the next generation of leaders.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="bg-yellow hover:bg-white text-darkblue px-10 py-5 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_rgba(255,195,0,0.3)] hover:shadow-yellow/40 flex items-center gap-3 group hover:-translate-y-1"
              >
                Start Your Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="glass-dark text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-darkblue transition-all border-white/20 hover:border-white/40"
              >
                Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Habbah */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-darkblue tracking-tight">Why choose Habbah</h2>
          <p className="text-gray-500 mt-4 font-semibold text-lg">
            Discover how we support students in achieving their academic dreams through a sustainable and trust-based model.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: "Convenient Repayment",
              desc: "Interest-free loans with flexible repayment plans tailored to your financial situation.",
              icon: HandCoins,
              img: "/unnamed (1).jpg"
            },
            {
              title: "Tailored Loan Programmes",
              desc: "Specialized financial support for various undergraduate degrees in top universities.",
              icon: GraduationCap,
              img: "/unnamed (2).jpg"
            },
            {
              title: "Guidance & Counselling",
              desc: "Professional mentorship and career advice to help you navigate your educational journey.",
              icon: UserRoundCheck,
              img: "/unnamed.jpg"
            }
          ].map((item, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between group overflow-hidden">
              <div>
                <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                  <Image 
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-darkblue/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
                    <item.icon className="w-6 h-6 text-darkblue" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-darkblue mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
