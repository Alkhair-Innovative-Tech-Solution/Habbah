import type { CollectionConfig } from "payload";
import { heroBlock } from "../blocks/Hero";
import { textBlock } from "../blocks/Text";
import { cardsGridBlock } from "../blocks/CardsGrid";
import { statsBlock } from "../blocks/Stats";
import { testimonialsBlock } from "../blocks/Testimonials";
import { ctaBlock } from "../blocks/CTA";
import { timelineBlock } from "../blocks/Timeline";
import { partnersBlock } from "../blocks/Partners";
import { teamBlock } from "../blocks/Team";
import { mapSectionBlock } from "../blocks/MapSection";
import { contactFormBlock } from "../blocks/ContactForm";
import { jobsSectionBlock } from "../blocks/JobsSection";

const PAGE_NAMES = [
  { label: "Home", value: "home" },
  { label: "About", value: "about" },
  { label: "Application Process", value: "application-process" },
  { label: "Success Stories", value: "success-stories" },
  { label: "Contact", value: "contact" },
  { label: "Careers", value: "careers" },
  { label: "Volunteer", value: "volunteer" },
] as const;

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "Habbah Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Page Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Page Slug",
      admin: {
        placeholder: "e.g., about, contact, my-custom-page",
      },
    },
    {
      name: "seo",
      type: "group",
      label: "SEO Settings",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Title",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Description",
        },
      ],
    },
    {
      name: "sections",
      type: "blocks",
      label: "Page Sections",
      labels: { singular: "Section", plural: "Sections" },
      blocks: [
        heroBlock,
        textBlock,
        cardsGridBlock,
        statsBlock,
        testimonialsBlock,
        ctaBlock,
        timelineBlock,
        partnersBlock,
        teamBlock,
        mapSectionBlock,
        contactFormBlock,
        jobsSectionBlock,
      ],
    },
  ],
};
