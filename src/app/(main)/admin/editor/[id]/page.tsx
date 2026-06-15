"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Settings,
  X,
  PlusCircle,
  Folder,
  Globe,
  Settings2,
  FileText,
  GripVertical
} from "lucide-react";
import {
  HeroBlock,
  TextBlock,
  CardsGridBlock,
  StatsBlock,
  TestimonialsBlock,
  CtaBlock,
  TimelineBlock,
  PartnersBlock,
  TeamBlock,
  MapSectionBlock,
  ContactFormBlock,
  JobsSectionBlock
} from "@/components/BlocksRenderer";

// Default template configuration for each block type
const TEMPLATE_BLOCKS: Record<string, any> = {
  hero: {
    blockType: "hero",
    badge: "NEW",
    title: "Welcome to Habbah Educational Trust",
    subtitle: "Empowering Future Leaders Through Education",
    highlightWord: "Education",
    cta: { label: "Apply Now", link: "/application-process" },
    stats: [
      { value: "1000+", label: "Students Supported" },
      { value: "50+", label: "Partner Institutions" }
    ],
    backgroundType: "darkblue"
  },
  text: {
    blockType: "text",
    badge: "ABOUT US",
    title: "Our Mission & Vision",
    layout: "centered",
    background: "none",
    content: [{ children: [{ text: "We aim to provide access to high-quality education and support systems for underprivileged students." }] }]
  },
  "cards-grid": {
    blockType: "cards-grid",
    badge: "OUR PROGRAMS",
    title: "What We Offer",
    description: "Explore our educational initiatives and how we make an impact.",
    columns: "3",
    cards: [
      { title: "Scholarships", description: "Financial assistance for meritorious students.", icon: "GraduationCap", link: "/about" },
      { title: "Mentorship", description: "Connecting students with experienced professionals.", icon: "Users", link: "/about" },
      { title: "Career Guidance", description: "Providing professional guidance and placement opportunities.", icon: "Briefcase", link: "/careers" }
    ]
  },
  stats: {
    blockType: "stats",
    badge: "OUR IMPACT",
    title: "By The Numbers",
    layout: "grid",
    stats: [
      { value: "20K+", label: "Scholarships Awarded" },
      { value: "95%", label: "Graduation Rate" },
      { value: "150+", label: "Active Volunteers" }
    ]
  },
  testimonials: {
    blockType: "testimonials",
    badge: "FEEDBACK",
    title: "What People Say",
    description: "Hear from our scholars and partners.",
    testimonials: [
      { quote: "This trust changed my life by allowing me to complete my engineering degree.", name: "Sarah Ahmed", role: "Software Engineer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" }
    ]
  },
  cta: {
    blockType: "cta",
    title: "Ready to Make an Impact?",
    description: "Join our network of volunteers and supporters today.",
    button: { label: "Get Involved", link: "/volunteer" },
    backgroundType: "dark"
  },
  timeline: {
    blockType: "timeline",
    badge: "HOW IT WORKS",
    title: "Application Timeline",
    steps: [
      { stepNumber: "1", title: "Online Application", description: "Submit your academic details online.", icon: "FileText" },
      { stepNumber: "2", title: "Interview", description: "Selected candidates will be invited.", icon: "Users" }
    ]
  },
  partners: {
    blockType: "partners",
    badge: "PARTNERS",
    title: "Our Supporters",
    partners: [
      { name: "Partner Organization A" },
      { name: "Partner Organization B" }
    ]
  },
  team: {
    blockType: "team",
    badge: "LEADERSHIP",
    title: "Meet Our Team",
    members: [
      { name: "John Doe", role: "Executive Director", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" }
    ]
  },
  "map-section": {
    blockType: "map-section",
    title: "Our Location",
    address: "123 Education Way, Suite 400, New York, NY 10001",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4251760431326!2d-73.98731968459384!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c105459b%3A0xe572406744c09d95!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1652391083921!5m2!1sen!2sus",
    contacts: [
      { label: "Email", value: "info@habbah.org" },
      { label: "Phone", value: "+1 (212) 555-0199" }
    ]
  },
  "contact-form": {
    blockType: "contact-form",
    title: "Contact Us",
    description: "Send us a message and we'll get back to you shortly.",
    submitLabel: "Submit Form",
    fields: [
      { name: "name", label: "Your Name", type: "text", required: true, placeholder: "Enter your name" },
      { name: "email", label: "Your Email", type: "email", required: true, placeholder: "Enter your email" },
      { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Your message" }
    ]
  },
  "jobs-section": {
    blockType: "jobs-section",
    badge: "CAREERS",
    title: "Open Positions",
    description: "Join our professional team.",
    emptyMessage: "No open positions at this time. Check back later!"
  }
};

const BLOCK_TYPES_METADATA = [
  { value: "hero", label: "Hero Block", description: "Top banner with title, background image and stats" },
  { value: "text", label: "Text Block", description: "Paragraph section for formatted text content" },
  { value: "cards-grid", label: "Cards Grid", description: "Grid of feature cards with icons or images" },
  { value: "stats", label: "Stats Block", description: "Key stats callouts in a grid or row layout" },
  { value: "testimonials", label: "Testimonials", description: "Slider/grid of customer quote cards" },
  { value: "cta", label: "CTA Block", description: "Bold Call-To-Action panel with button" },
  { value: "timeline", label: "Timeline", description: "Step-by-step milestones or instructions" },
  { value: "partners", label: "Partners Grid", description: "Display corporate/supporter logos" },
  { value: "team", label: "Team Grid", description: "Show profile cards of leadership & staff" },
  { value: "map-section", label: "Map & Office", description: "Embedded Google Map with address details" },
  { value: "contact-form", label: "Contact Form", description: "Direct submit inquiry form block" },
  { value: "jobs-section", label: "Jobs List", description: "Live listings fetched from careers board" }
];

interface PageEditorProps {
  params: Promise<{ id: string }>;
}

export default function PageEditor({ params }: PageEditorProps) {
  const { id } = use(params);
  const router = useRouter();

  // Authentication & Loading States
  const [authChecking, setAuthChecking] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active Document Configuration
  const [pageTitle, setPageTitle] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [sections, setSections] = useState<any[]>([]);

  // UX & Editor Mode States
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editingPageSettings, setEditingPageSettings] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const toastId = Date.now();
    setToasts(prev => [...prev, { id: toastId, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 4000);
  };

  // Auth Guard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (data.user && (data.user.role === 'ADMIN' || data.user.role === 'SUPER_ADMIN')) {
            setAuthChecking(false);
          } else {
            router.replace("/admin");
          }
        } else {
          router.replace("/admin");
        }
      } catch (err) {
        console.error("Auth check error:", err);
        router.replace("/admin");
      }
    };
    checkAuth();
  }, [router]);

  // Load Page Data
  useEffect(() => {
    if (authChecking) return;

    const fetchPageData = async () => {
      setPageLoading(true);
      try {
        const res = await fetch(`/api/pages/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPageTitle(data.title || "");
          setPageSlug(data.slug || "");
          setMetaTitle(data.seo?.metaTitle || "");
          setMetaDescription(data.seo?.metaDescription || "");
          setSections(data.sections || []);
        } else {
          setError("Failed to fetch page configuration. Please make sure the page exists.");
        }
      } catch (err) {
        console.error("Failed to load page details:", err);
        setError("Network error. Please try again.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchPageData();
  }, [id, authChecking]);

  // Save / Publish to CMS
  const handleSaveAndPublish = async () => {
    if (!pageTitle.trim()) {
      showToast("Page title is required", "error");
      return;
    }
    if (!pageSlug.trim()) {
      showToast("Page slug is required", "error");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        title: pageTitle,
        slug: pageSlug,
        seo: {
          metaTitle: metaTitle || undefined,
          metaDescription: metaDescription || undefined,
        },
        sections: sections
      };

      const res = await fetch(`/api/pages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast("Page layout saved & published successfully!", "success");
      } else {
        const data = await res.json();
        const errMessage = data.errors?.[0]?.message || "Failed to publish page.";
        showToast(errMessage, "error");
      }
    } catch (err) {
      console.error("Error saving page:", err);
      showToast("Network error. Failed to save changes.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Reorder Block - Up / Down
  const moveBlockUp = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === 0) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSections(updated);
    if (selectedIdx === index) setSelectedIdx(index - 1);
    else if (selectedIdx === index - 1) setSelectedIdx(index);
  };

  const moveBlockDown = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSections(updated);
    if (selectedIdx === index) setSelectedIdx(index + 1);
    else if (selectedIdx === index + 1) setSelectedIdx(index);
  };

  // Delete Block
  const deleteBlock = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this section from the layout?")) {
      const updated = sections.filter((_, idx) => idx !== index);
      setSections(updated);
      setSelectedIdx(null);
      showToast("Section removed from layout", "info");
    }
  };

  // Drag-and-drop Events
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (isPreviewMode) return;
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    const updated = [...sections];
    const [removed] = updated.splice(draggedIdx, 1);
    updated.splice(index, 0, removed);
    setSections(updated);
    if (selectedIdx === draggedIdx) setSelectedIdx(index);
    setDraggedIdx(null);
  };

  // Add Section to Page
  const handleAddSection = (blockType: string) => {
    const template = JSON.parse(JSON.stringify(TEMPLATE_BLOCKS[blockType]));
    const updated = [...sections, template];
    setSections(updated);
    setSelectedIdx(updated.length - 1);
    setEditingPageSettings(false);
    setShowAddMenu(false);
    showToast(`Added ${BLOCK_TYPES_METADATA.find(b => b.value === blockType)?.label || blockType} section`, "success");
    
    // Smooth scroll to bottom after react state rendering
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  // Inline value updates from the settings drawer
  const updateSectionField = (fieldPath: string[], value: any) => {
    if (selectedIdx === null) return;
    
    const updatedSections = [...sections];
    let current = updatedSections[selectedIdx];
    
    // Traverse path to modify nested values
    for (let i = 0; i < fieldPath.length - 1; i++) {
      const key = fieldPath[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[fieldPath[fieldPath.length - 1]] = value;
    setSections(updatedSections);
  };

  // Helper to get nested value
  const getSectionField = (fieldPath: string[], fallback: any = "") => {
    if (selectedIdx === null) return fallback;
    let current = sections[selectedIdx];
    for (const key of fieldPath) {
      if (current === undefined || current === null) return fallback;
      current = current[key];
    }
    return current !== undefined ? current : fallback;
  };

  // Render correct preview block using components from BlocksRenderer
  const renderVisualBlock = (section: any, idx: number) => {
    switch (section.blockType) {
      case "hero":
        return <HeroBlock {...section} />;
      case "text":
        return <TextBlock {...section} />;
      case "cards-grid":
        return <CardsGridBlock {...section} />;
      case "stats":
        return <StatsBlock {...section} />;
      case "testimonials":
        return <TestimonialsBlock {...section} />;
      case "cta":
        return <CtaBlock {...section} />;
      case "timeline":
        return <TimelineBlock {...section} />;
      case "partners":
        return <PartnersBlock {...section} />;
      case "team":
        return <TeamBlock {...section} />;
      case "map-section":
        return <MapSectionBlock {...section} />;
      case "contact-form":
        return <ContactFormBlock {...section} />;
      case "jobs-section":
        return <JobsSectionBlock {...section} />;
      default:
        return (
          <div className="p-8 bg-amber-50 text-amber-700 border border-amber-200 rounded-3xl m-4 text-center">
            <p className="font-bold">Unknown section type: {section.blockType}</p>
          </div>
        );
    }
  };

  // Form Field Renderers inside the side panel drawer
  const renderHeroSettings = () => {
    const statsList = getSectionField(["stats"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-all"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-all"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Highlight Word (gradient color)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-all"
            value={getSectionField(["highlightWord"])}
            onChange={(e) => updateSectionField(["highlightWord"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Subtitle</label>
          <textarea
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-all"
            value={getSectionField(["subtitle"])}
            onChange={(e) => updateSectionField(["subtitle"], e.target.value)}
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="text-sm font-bold text-yellow mb-3">Call to Action Button</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Button Text</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
                value={getSectionField(["cta", "label"])}
                onChange={(e) => updateSectionField(["cta", "label"], e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Link URL</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
                value={getSectionField(["cta", "link"])}
                onChange={(e) => updateSectionField(["cta", "link"], e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-yellow">Stats Badges</h4>
            <button
              type="button"
              onClick={() => {
                const currentStats = [...statsList, { value: "0", label: "Label" }];
                updateSectionField(["stats"], currentStats);
              }}
              className="p-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
            {statsList.map((stat: any, sIdx: number) => (
              <div key={sIdx} className="flex gap-2 items-center bg-white/5 p-2 rounded-lg relative group">
                <input
                  type="text"
                  placeholder="Value (e.g. 50+)"
                  className="w-24 bg-darkblue border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                  value={stat.value || ""}
                  onChange={(e) => {
                    const temp = [...statsList];
                    temp[sIdx].value = e.target.value;
                    updateSectionField(["stats"], temp);
                  }}
                />
                <input
                  type="text"
                  placeholder="Label"
                  className="flex-1 bg-darkblue border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                  value={stat.label || ""}
                  onChange={(e) => {
                    const temp = [...statsList];
                    temp[sIdx].label = e.target.value;
                    updateSectionField(["stats"], temp);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const temp = statsList.filter((_: any, i: number) => i !== sIdx);
                    updateSectionField(["stats"], temp);
                  }}
                  className="text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Background Overlay Theme</label>
          <select
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["backgroundType"])}
            onChange={(e) => updateSectionField(["backgroundType"], e.target.value)}
          >
            <option value="darkblue" className="bg-darkblue">Dark Blue</option>
            <option value="light" className="bg-darkblue">Light Overlay</option>
          </select>
        </div>
      </div>
    );
  };

  const renderTextSettings = () => {
    const contentList = getSectionField(["content"], []);
    
    // Parse rich text paragraphs (Lexical structure vs Slate structure)
    let rawText = "";
    if (Array.isArray(contentList)) {
      rawText = contentList.map((p: any) => p.children?.map((c: any) => c.text).join("") || "").join("\n");
    } else if (contentList && typeof contentList === "object" && contentList.root && Array.isArray(contentList.root.children)) {
      rawText = contentList.root.children.map((p: any) => p.children?.map((c: any) => c.text).join("") || "").join("\n");
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const lines = e.target.value.split("\n");
      const children = lines.map(line => ({
        type: "paragraph",
        children: [{ type: "text", text: line, version: 1 }],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1
      }));
      const lexicalObj = {
        root: {
          type: "root",
          children: children,
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1
        }
      };
      updateSectionField(["content"], lexicalObj);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Text Content (Paragraphs)</label>
          <textarea
            rows={10}
            placeholder="Type each paragraph on a new line..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow font-mono text-sm leading-relaxed"
            value={rawText}
            onChange={handleTextareaChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Alignment</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
              value={getSectionField(["layout"])}
              onChange={(e) => updateSectionField(["layout"], e.target.value)}
            >
              <option value="centered" className="bg-darkblue">Centered</option>
              <option value="left" className="bg-darkblue">Left Aligned</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Background</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
              value={getSectionField(["background"])}
              onChange={(e) => updateSectionField(["background"], e.target.value)}
            >
              <option value="none" className="bg-darkblue">None (White)</option>
              <option value="lightblue" className="bg-darkblue">Light Blue</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderCardsGridSettings = () => {
    const cardsList = getSectionField(["cards"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</label>
          <textarea
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["description"])}
            onChange={(e) => updateSectionField(["description"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Columns</label>
          <select
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["columns"])}
            onChange={(e) => updateSectionField(["columns"], e.target.value)}
          >
            <option value="2" className="bg-darkblue">2 Columns</option>
            <option value="3" className="bg-darkblue">3 Columns</option>
            <option value="4" className="bg-darkblue">4 Columns</option>
          </select>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-yellow">Cards List</h4>
            <button
              type="button"
              onClick={() => {
                const newCard = { title: "New Card", description: "Card description text", icon: "HelpCircle", link: "" };
                updateSectionField(["cards"], [...cardsList, newCard]);
              }}
              className="px-2.5 py-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Card
            </button>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {cardsList.map((card: any, cIdx: number) => (
              <div key={cIdx} className="bg-white/5 p-3 rounded-xl border border-white/10 relative space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    const updatedCards = cardsList.filter((_: any, idx: number) => idx !== cIdx);
                    updateSectionField(["cards"], updatedCards);
                  }}
                  className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Card Title</label>
                  <input
                    type="text"
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={card.title || ""}
                    onChange={(e) => {
                      const temp = [...cardsList];
                      temp[cIdx].title = e.target.value;
                      updateSectionField(["cards"], temp);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={card.description || ""}
                    onChange={(e) => {
                      const temp = [...cardsList];
                      temp[cIdx].description = e.target.value;
                      updateSectionField(["cards"], temp);
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Lucide Icon</label>
                    <input
                      type="text"
                      placeholder="e.g., Heart"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={card.icon || ""}
                      onChange={(e) => {
                        const temp = [...cardsList];
                        temp[cIdx].icon = e.target.value;
                        updateSectionField(["cards"], temp);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Image Link</label>
                    <input
                      type="text"
                      placeholder="Unsplash URL"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={typeof card.image === "object" ? card.image?.url : card.image || ""}
                      onChange={(e) => {
                        const temp = [...cardsList];
                        temp[cIdx].image = e.target.value;
                        updateSectionField(["cards"], temp);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Link URL</label>
                  <input
                    type="text"
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={card.link || ""}
                    onChange={(e) => {
                      const temp = [...cardsList];
                      temp[cIdx].link = e.target.value;
                      updateSectionField(["cards"], temp);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderStatsSettings = () => {
    const statsList = getSectionField(["stats"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Layout</label>
          <select
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["layout"])}
            onChange={(e) => updateSectionField(["layout"], e.target.value)}
          >
            <option value="grid" className="bg-darkblue">Grid Layout</option>
            <option value="row" className="bg-darkblue">Row Layout</option>
          </select>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-yellow">Stats list</h4>
            <button
              type="button"
              onClick={() => {
                updateSectionField(["stats"], [...statsList, { value: "10+", label: "Label" }]);
              }}
              className="px-2 py-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {statsList.map((stat: any, sIdx: number) => (
              <div key={sIdx} className="flex gap-2 items-center bg-white/5 p-2 rounded-lg relative">
                <input
                  type="text"
                  placeholder="Value"
                  className="w-24 bg-darkblue border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                  value={stat.value || ""}
                  onChange={(e) => {
                    const temp = [...statsList];
                    temp[sIdx].value = e.target.value;
                    updateSectionField(["stats"], temp);
                  }}
                />
                <input
                  type="text"
                  placeholder="Label"
                  className="flex-1 bg-darkblue border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                  value={stat.label || ""}
                  onChange={(e) => {
                    const temp = [...statsList];
                    temp[sIdx].label = e.target.value;
                    updateSectionField(["stats"], temp);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const temp = statsList.filter((_: any, idx: number) => idx !== sIdx);
                    updateSectionField(["stats"], temp);
                  }}
                  className="text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTestimonialsSettings = () => {
    const list = getSectionField(["testimonials"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</label>
          <textarea
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["description"])}
            onChange={(e) => updateSectionField(["description"], e.target.value)}
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-yellow">Testimonials</h4>
            <button
              type="button"
              onClick={() => {
                updateSectionField(["testimonials"], [...list, { quote: "Great work!", name: "Name", role: "Role", image: "" }]);
              }}
              className="px-2.5 py-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Testimonial
            </button>
          </div>

          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
            {list.map((item: any, idx: number) => (
              <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 relative space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSectionField(["testimonials"], list.filter((_: any, i: number) => i !== idx));
                  }}
                  className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Quote</label>
                  <textarea
                    rows={2}
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={item.quote || ""}
                    onChange={(e) => {
                      const temp = [...list];
                      temp[idx].quote = e.target.value;
                      updateSectionField(["testimonials"], temp);
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Name</label>
                    <input
                      type="text"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={item.name || ""}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].name = e.target.value;
                        updateSectionField(["testimonials"], temp);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Role</label>
                    <input
                      type="text"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={item.role || ""}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].role = e.target.value;
                        updateSectionField(["testimonials"], temp);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Avatar URL</label>
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={typeof item.image === "object" ? item.image?.url : item.image || ""}
                    onChange={(e) => {
                      const temp = [...list];
                      temp[idx].image = e.target.value;
                      updateSectionField(["testimonials"], temp);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCtaSettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</label>
          <textarea
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["description"])}
            onChange={(e) => updateSectionField(["description"], e.target.value)}
          />
        </div>
        <div className="border-t border-white/10 pt-4">
          <h4 className="text-sm font-bold text-yellow mb-3">CTA Button</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Button Text</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
                value={getSectionField(["button", "label"])}
                onChange={(e) => updateSectionField(["button", "label"], e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Link URL</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
                value={getSectionField(["button", "link"])}
                onChange={(e) => updateSectionField(["button", "link"], e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Background Theme</label>
          <select
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["backgroundType"])}
            onChange={(e) => updateSectionField(["backgroundType"], e.target.value)}
          >
            <option value="dark" className="bg-darkblue">Dark panel</option>
            <option value="light" className="bg-darkblue">Light panel</option>
          </select>
        </div>
      </div>
    );
  };

  const renderTimelineSettings = () => {
    const list = getSectionField(["steps"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-yellow">Steps Milestones</h4>
            <button
              type="button"
              onClick={() => {
                updateSectionField(["steps"], [...list, { stepNumber: String(list.length + 1), title: "Step Title", description: "Step description", icon: "Clock" }]);
              }}
              className="px-2 py-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {list.map((item: any, idx: number) => (
              <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 relative space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSectionField(["steps"], list.filter((_: any, i: number) => i !== idx));
                  }}
                  className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  <div className="w-16">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Num</label>
                    <input
                      type="text"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2 py-1 text-white text-xs text-center"
                      value={item.stepNumber || ""}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].stepNumber = e.target.value;
                        updateSectionField(["steps"], temp);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Step Title</label>
                    <input
                      type="text"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={item.title || ""}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].title = e.target.value;
                        updateSectionField(["steps"], temp);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={item.description || ""}
                    onChange={(e) => {
                      const temp = [...list];
                      temp[idx].description = e.target.value;
                      updateSectionField(["steps"], temp);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Lucide Icon</label>
                  <input
                    type="text"
                    placeholder="e.g. Heart"
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={item.icon || ""}
                    onChange={(e) => {
                      const temp = [...list];
                      temp[idx].icon = e.target.value;
                      updateSectionField(["steps"], temp);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPartnersSettings = () => {
    const list = getSectionField(["partners"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-yellow">Supporter Logos</h4>
            <button
              type="button"
              onClick={() => {
                updateSectionField(["partners"], [...list, { name: "New Partner", logo: "" }]);
              }}
              className="px-2 py-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Partner
            </button>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {list.map((item: any, idx: number) => (
              <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 relative space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSectionField(["partners"], list.filter((_: any, i: number) => i !== idx));
                  }}
                  className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Partner Name</label>
                  <input
                    type="text"
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={item.name || ""}
                    onChange={(e) => {
                      const temp = [...list];
                      temp[idx].name = e.target.value;
                      updateSectionField(["partners"], temp);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Logo URL</label>
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={typeof item.logo === "object" ? item.logo?.url : item.logo || ""}
                    onChange={(e) => {
                      const temp = [...list];
                      temp[idx].logo = e.target.value;
                      updateSectionField(["partners"], temp);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTeamMembersSettings = () => {
    const list = getSectionField(["members"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-yellow">Team Members</h4>
            <button
              type="button"
              onClick={() => {
                updateSectionField(["members"], [...list, { name: "Name", role: "Role", image: "" }]);
              }}
              className="px-2 py-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Member
            </button>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {list.map((item: any, idx: number) => (
              <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 relative space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSectionField(["members"], list.filter((_: any, i: number) => i !== idx));
                  }}
                  className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Name</label>
                    <input
                      type="text"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={item.name || ""}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].name = e.target.value;
                        updateSectionField(["members"], temp);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Role</label>
                    <input
                      type="text"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={item.role || ""}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].role = e.target.value;
                        updateSectionField(["members"], temp);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Photo URL</label>
                  <input
                    type="text"
                    placeholder="Unsplash / local URL"
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={typeof item.image === "object" ? item.image?.url : item.image || ""}
                    onChange={(e) => {
                      const temp = [...list];
                      temp[idx].image = e.target.value;
                      updateSectionField(["members"], temp);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMapSettings = () => {
    const list = getSectionField(["contacts"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Office Address</label>
          <textarea
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["address"])}
            onChange={(e) => updateSectionField(["address"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Google Map Embed URL</label>
          <input
            type="text"
            placeholder="https://www.google.com/maps/embed?..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none text-xs"
            value={getSectionField(["embedUrl"])}
            onChange={(e) => updateSectionField(["embedUrl"], e.target.value)}
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-yellow">Contacts Details</h4>
            <button
              type="button"
              onClick={() => {
                updateSectionField(["contacts"], [...list, { label: "Email", value: "info@habbah.org" }]);
              }}
              className="px-2 py-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
            {list.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-2 items-center bg-white/5 p-2 rounded-lg relative">
                <input
                  type="text"
                  placeholder="Label"
                  className="w-24 bg-darkblue border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                  value={item.label || ""}
                  onChange={(e) => {
                    const temp = [...list];
                    temp[idx].label = e.target.value;
                    updateSectionField(["contacts"], temp);
                  }}
                />
                <input
                  type="text"
                  placeholder="Value"
                  className="flex-1 bg-darkblue border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                  value={item.value || ""}
                  onChange={(e) => {
                    const temp = [...list];
                    temp[idx].value = e.target.value;
                    updateSectionField(["contacts"], temp);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    updateSectionField(["contacts"], list.filter((_: any, i: number) => i !== idx));
                  }}
                  className="text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContactFormSettings = () => {
    const list = getSectionField(["fields"], []) || [];
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</label>
          <textarea
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["description"])}
            onChange={(e) => updateSectionField(["description"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Submit Button Label</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["submitLabel"])}
            onChange={(e) => updateSectionField(["submitLabel"], e.target.value)}
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-yellow">Form Fields</h4>
            <button
              type="button"
              onClick={() => {
                updateSectionField(["fields"], [...list, { name: "field_" + Date.now(), label: "Label", type: "text", required: true, placeholder: "" }]);
              }}
              className="px-2 py-1 bg-yellow/10 text-yellow hover:bg-yellow hover:text-darkblue rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Field
            </button>
          </div>

          <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
            {list.map((item: any, idx: number) => (
              <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 relative space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSectionField(["fields"], list.filter((_: any, i: number) => i !== idx));
                  }}
                  className="absolute top-2 right-2 text-rose-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Field Label</label>
                    <input
                      type="text"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={item.label || ""}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].label = e.target.value;
                        updateSectionField(["fields"], temp);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Slug Name</label>
                    <input
                      type="text"
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                      value={item.name || ""}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].name = e.target.value;
                        updateSectionField(["fields"], temp);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Input Type</label>
                    <select
                      className="w-full bg-darkblue border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
                      value={item.type || "text"}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].type = e.target.value;
                        updateSectionField(["fields"], temp);
                      }}
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="textarea">Textarea</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-4 pl-2">
                    <input
                      type="checkbox"
                      id={`req_${idx}`}
                      className="rounded bg-darkblue border-white/10 text-yellow focus:ring-0 mr-2"
                      checked={item.required}
                      onChange={(e) => {
                        const temp = [...list];
                        temp[idx].required = e.target.checked;
                        updateSectionField(["fields"], temp);
                      }}
                    />
                    <label htmlFor={`req_${idx}`} className="text-[10px] font-bold text-gray-300 uppercase select-none">Required</label>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-0.5">Placeholder</label>
                  <input
                    type="text"
                    className="w-full bg-darkblue border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs"
                    value={item.placeholder || ""}
                    onChange={(e) => {
                      const temp = [...list];
                      temp[idx].placeholder = e.target.value;
                      updateSectionField(["fields"], temp);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderJobsSectionSettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Badge Text</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["badge"])}
            onChange={(e) => updateSectionField(["badge"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Heading (Title)</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["title"])}
            onChange={(e) => updateSectionField(["title"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</label>
          <textarea
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["description"])}
            onChange={(e) => updateSectionField(["description"], e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Empty List Message</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
            value={getSectionField(["emptyMessage"])}
            onChange={(e) => updateSectionField(["emptyMessage"], e.target.value)}
          />
        </div>
        <div className="p-4 bg-yellow/5 border border-yellow/20 rounded-2xl text-yellow/80 text-xs leading-relaxed">
          <p className="font-bold mb-1">ℹ️ Dynamic Section Info</p>
          This block automatically fetches active and published jobs in real-time from the operational database.
        </div>
      </div>
    );
  };

  const renderActiveBlockForm = () => {
    if (selectedIdx === null) return null;
    const blockType = sections[selectedIdx]?.blockType;

    let formContent = null;
    switch (blockType) {
      case "hero":
        formContent = renderHeroSettings();
        break;
      case "text":
        formContent = renderTextSettings();
        break;
      case "cards-grid":
        formContent = renderCardsGridSettings();
        break;
      case "stats":
        formContent = renderStatsSettings();
        break;
      case "testimonials":
        formContent = renderTestimonialsSettings();
        break;
      case "cta":
        formContent = renderCtaSettings();
        break;
      case "timeline":
        formContent = renderTimelineSettings();
        break;
      case "partners":
        formContent = renderPartnersSettings();
        break;
      case "team":
        formContent = renderTeamMembersSettings();
        break;
      case "map-section":
        formContent = renderMapSettings();
        break;
      case "contact-form":
        formContent = renderContactFormSettings();
        break;
      case "jobs-section":
        formContent = renderJobsSectionSettings();
        break;
      default:
        formContent = <p className="text-gray-400 text-sm">No editing inputs available for this block type.</p>;
    }

    const showCardStyling = blockType === "cards-grid" || blockType === "testimonials" || blockType === "stats" || blockType === "timeline" || blockType === "team" || blockType === "map-section" || blockType === "contact-form" || blockType === "jobs-section" || blockType === "partners";

    return (
      <div className="space-y-8">
        {formContent}
        
        {/* COMMON SECTION STYLE OPTIONS */}
        <div className="border-t border-white/10 pt-6 mt-6 space-y-6">
          <h4 className="text-sm font-bold text-yellow uppercase tracking-wider">🎨 Block Style Options</h4>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Text Color Override (Hex)</label>
            <div className="flex gap-2">
              <input
                type="color"
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
                value={getSectionField(["textColor"])?.startsWith('#') ? getSectionField(["textColor"]) : "#ffffff"}
                onChange={(e) => updateSectionField(["textColor"], e.target.value)}
              />
              <input
                type="text"
                placeholder="e.g. #ffc300"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                value={getSectionField(["textColor"])}
                onChange={(e) => updateSectionField(["textColor"], e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Background Color Override (Hex)</label>
            <div className="flex gap-2">
              <input
                type="color"
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
                value={getSectionField(["backgroundColor"])?.startsWith('#') ? getSectionField(["backgroundColor"]) : "#03045e"}
                onChange={(e) => updateSectionField(["backgroundColor"], e.target.value)}
              />
              <input
                type="text"
                placeholder="e.g. #03045e"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                value={getSectionField(["backgroundColor"])}
                onChange={(e) => updateSectionField(["backgroundColor"], e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Background Image URL</label>
            <input
              type="text"
              placeholder="e.g. https://images.unsplash.com/..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none text-sm"
              value={getSectionField(["backgroundImage"])}
              onChange={(e) => updateSectionField(["backgroundImage"], e.target.value)}
            />
          </div>

          {showCardStyling && (
            <div className="border-t border-white/10 pt-4 mt-4 space-y-4">
              <h5 className="text-xs font-bold text-lightblue uppercase tracking-wider">🎴 Card Color Options</h5>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Card Background Color (Hex)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
                    value={getSectionField(["cardBgColor"])?.startsWith('#') ? getSectionField(["cardBgColor"]) : "#ffffff"}
                    onChange={(e) => updateSectionField(["cardBgColor"], e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="e.g. rgba(255,255,255,0.7) or #ffffff"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                    value={getSectionField(["cardBgColor"])}
                    onChange={(e) => updateSectionField(["cardBgColor"], e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Card Text Color (Hex)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
                    value={getSectionField(["cardTextColor"])?.startsWith('#') ? getSectionField(["cardTextColor"]) : "#000000"}
                    onChange={(e) => updateSectionField(["cardTextColor"], e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="e.g. #03045e"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                    value={getSectionField(["cardTextColor"])}
                    onChange={(e) => updateSectionField(["cardTextColor"], e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render Splash Loading state
  if (authChecking || pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-darkblue via-[#0c1f6d] to-[#03114b]">
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-yellow animate-spin duration-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse">
            <div className="w-8 h-8 bg-yellow rounded-full blur-md opacity-50"></div>
          </div>
          <p className="text-white/60 font-black tracking-widest uppercase text-xs mt-8">
            {authChecking ? "Verifying Authorization..." : "Loading Visual Builder..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-darkblue via-[#0c1f6d] to-[#03114b] p-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/15 p-10 rounded-[3rem] text-center space-y-6 text-white">
          <X className="w-16 h-16 text-rose-400 mx-auto" />
          <h3 className="text-2xl font-black">Editor Error</h3>
          <p className="text-white/75 font-semibold text-sm leading-relaxed">{error}</p>
          <Link
            href="/admin/dashboard?tab=cmspages"
            className="inline-block bg-yellow text-darkblue hover:bg-white px-8 py-4 rounded-full font-black text-sm transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative flex flex-col font-sans select-none">
      
      {/* Toast Alert Popups */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-6 py-4 rounded-2xl shadow-2xl font-black text-sm flex items-center gap-3 animate-in slide-in-from-left-4 duration-300 border ${
              toast.type === "success"
                ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                : toast.type === "error"
                ? "bg-rose-950 text-rose-300 border-rose-800"
                : "bg-blue-950 text-blue-300 border-blue-800"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              toast.type === "success" ? "bg-emerald-400" : toast.type === "error" ? "bg-rose-400" : "bg-blue-400"
            }`} />
            {toast.message}
          </div>
        ))}
      </div>

      {/* STICKY CONTROL HEADER BAR */}
      <header className="sticky top-0 z-40 bg-darkblue border-b border-white/10 text-white shadow-lg backdrop-blur-md px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
        
        {/* Left Side: Back & Title details */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard?tab=cmspages"
            className="p-3 bg-white/5 border border-white/10 hover:bg-yellow hover:text-darkblue rounded-2xl transition-all"
            title="Back to pages dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-yellow/20 text-yellow text-[10px] font-black uppercase rounded-sm border border-yellow/30 tracking-widest">
                WYSIWYG
              </span>
              <h1 className="text-lg font-black tracking-tight">{pageTitle || "Untitled Page"}</h1>
            </div>
            <p className="text-xs text-gray-400 font-bold mt-0.5">
              Route: <span className="text-lightblue font-mono">{pageSlug === "home" ? "/" : `/${pageSlug}`}</span>
            </p>
          </div>
        </div>

        {/* Center: Add section dropdown & settings toggle */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <button
              onClick={() => {
                setShowAddMenu(!showAddMenu);
                setEditingPageSettings(false);
              }}
              className="bg-yellow hover:bg-white text-darkblue px-5 py-3 rounded-xl font-black text-xs transition-all flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Section
            </button>

            {/* Block Type Selection Dropdown Menu */}
            {showAddMenu && (
              <div className="absolute top-14 left-0 w-80 bg-darkblue/95 border border-white/10 rounded-[2rem] shadow-2xl z-50 p-4 animate-in fade-in duration-200">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                  <span className="text-xs font-black text-yellow uppercase tracking-widest">Select Layout Block</span>
                  <button onClick={() => setShowAddMenu(false)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                  {BLOCK_TYPES_METADATA.map((block) => (
                    <button
                      key={block.value}
                      onClick={() => handleAddSection(block.value)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-yellow hover:text-darkblue border border-transparent transition-all flex flex-col group"
                    >
                      <span className="text-xs font-black">{block.label}</span>
                      <span className="text-[10px] opacity-70 mt-0.5 font-semibold group-hover:opacity-90 leading-tight">
                        {block.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setEditingPageSettings(!editingPageSettings);
              setSelectedIdx(null);
              setShowAddMenu(false);
            }}
            className={`px-4 py-3 rounded-xl font-black text-xs transition-all border flex items-center gap-2 ${
              editingPageSettings
                ? "bg-lightblue border-lightblue text-darkblue"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            <Settings2 className="w-4 h-4" /> Page Settings
          </button>
        </div>

        {/* Right Side: Preview Toggle & Save button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsPreviewMode(!isPreviewMode);
              setSelectedIdx(null);
              setEditingPageSettings(false);
            }}
            className={`px-5 py-3 rounded-xl font-black text-xs transition-all border flex items-center gap-2 ${
              isPreviewMode
                ? "bg-white text-darkblue border-white"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-4 h-4" /> Edit Mode
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" /> Live Preview
              </>
            )}
          </button>

          <button
            onClick={handleSaveAndPublish}
            disabled={isSaving}
            className="bg-lightblue hover:bg-white text-darkblue px-6 py-3 rounded-xl font-black text-xs transition-all flex items-center gap-2 disabled:opacity-50 shadow-md"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save & Publish"}
          </button>
        </div>
      </header>

      {/* MAIN WYSIWYG CANVAS PANEL */}
      <main className="flex-1 bg-white relative">
        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8 bg-gray-50 border-4 border-dashed border-gray-100 m-8 rounded-[4rem]">
            <FileText className="w-24 h-24 text-gray-200 mb-6" />
            <h3 className="text-2xl font-black text-darkblue">Empty Web Page</h3>
            <p className="text-gray-400 mt-2 max-w-sm text-sm font-semibold leading-relaxed">
              No content blocks are currently defined. Click the <span className="text-idara-orange font-bold">Add Section</span> button above to place your first block!
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {sections.map((section, idx) => {
              const isSelected = selectedIdx === idx;
              
              return (
                <div
                  key={idx}
                  draggable={!isPreviewMode}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={() => setDraggedIdx(null)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onClick={() => {
                    if (!isPreviewMode) {
                      setSelectedIdx(idx);
                      setEditingPageSettings(false);
                    }
                  }}
                  className={`relative group ${
                    isPreviewMode ? "" : "border-y border-dashed border-gray-100 hover:bg-lightblue/[0.02] cursor-pointer"
                  } ${
                    isSelected && !isPreviewMode ? "ring-4 ring-lightblue ring-inset bg-lightblue/[0.03]" : ""
                  }`}
                >
                  
                  {/* Block Hover Drag-Overlay Mask */}
                  {!isPreviewMode && (
                    <div className={`absolute inset-0 z-20 pointer-events-none transition-colors border-2 ${
                      isSelected ? "border-lightblue" : "border-transparent group-hover:border-yellow/50"
                    }`} />
                  )}

                  {/* Visual Toolbar on top right of block */}
                  {!isPreviewMode && (
                    <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-darkblue/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-1.5 text-white/50 cursor-grab active:cursor-grabbing hover:text-white transition-colors" title="Drag to reorder">
                        <GripVertical className="w-4 h-4" />
                      </div>
                      
                      <button
                        onClick={(e) => moveBlockUp(idx, e)}
                        disabled={idx === 0}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-white disabled:opacity-30 transition-colors"
                        title="Move Section Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => moveBlockDown(idx, e)}
                        disabled={idx === sections.length - 1}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-white disabled:opacity-30 transition-colors"
                        title="Move Section Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      <div className="w-px h-4 bg-white/10 mx-1" />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedIdx(idx);
                          setEditingPageSettings(false);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${isSelected ? "bg-lightblue text-darkblue" : "hover:bg-white/10 text-white"}`}
                        title="Edit settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => deleteBlock(idx, e)}
                        className="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg hover:text-rose-300 transition-colors"
                        title="Delete block"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Render the block structure */}
                  <div className={isPreviewMode ? "" : "pointer-events-none"}>
                    {renderVisualBlock(section, idx)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* DRAWER SETTINGS PANEL Drawer Slide-out from Right */}
      {(selectedIdx !== null || editingPageSettings) && (
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-end">
          
          {/* Backdrop Mask clickable area to close */}
          <div
            className="absolute inset-0 bg-darkblue/10 backdrop-blur-xs pointer-events-auto cursor-pointer"
            onClick={() => {
              setSelectedIdx(null);
              setEditingPageSettings(false);
            }}
          />

          {/* Drawer Sidebar */}
          <div className="w-[440px] h-screen bg-darkblue/95 backdrop-blur-lg border-l border-white/10 shadow-2xl text-white pointer-events-auto flex flex-col relative z-10 animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-md font-black text-yellow tracking-tight uppercase">
                  {editingPageSettings ? "Document Properties" : `Edit ${BLOCK_TYPES_METADATA.find(b => b.value === sections[selectedIdx!]?.blockType)?.label || "Block"}`}
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 tracking-wider">
                  {editingPageSettings ? "SEO & Routing configuration" : "Changes render instantly on canvas"}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedIdx(null);
                  setEditingPageSettings(false);
                }}
                className="p-2 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* PAGE-LEVEL CONFIG Drawer */}
              {editingPageSettings ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Page Title</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-all"
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Page URL Slug</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-all font-mono"
                      value={pageSlug}
                      onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, ''))}
                    />
                    <p className="text-[10px] text-gray-400 font-semibold mt-1">
                      Note: Home page must be <span className="text-yellow font-mono">home</span>.
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-6">
                    <h4 className="text-sm font-bold text-yellow flex items-center gap-1.5">
                      <Globe className="w-4 h-4" /> SEO Settings
                    </h4>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Meta Title</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Meta Description</label>
                      <textarea
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* BLOCK-LEVEL CONFIG Drawer */
                renderActiveBlockForm()
              )}
            </div>

            {/* Sticky Drawer Footer actions */}
            <div className="p-6 border-t border-white/10 bg-darkblue flex gap-4">
              <button
                onClick={() => {
                  setSelectedIdx(null);
                  setEditingPageSettings(false);
                }}
                className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-xl text-xs font-black text-center transition-all"
              >
                Close Settings
              </button>
              <button
                onClick={() => {
                  setSelectedIdx(null);
                  setEditingPageSettings(false);
                  handleSaveAndPublish();
                }}
                className="flex-1 bg-yellow hover:bg-white text-darkblue py-4 rounded-xl text-xs font-black text-center transition-all shadow-md"
              >
                Apply & Save Page
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
