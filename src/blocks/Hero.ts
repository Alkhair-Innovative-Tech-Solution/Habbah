import type { Block } from "payload";

export const heroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero Section", plural: "Hero Sections" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", required: true, label: "Heading" },
    { name: "subtitle", type: "textarea", label: "Subtitle" },
    { name: "highlightWord", type: "text", label: "Highlight Word" },
    {
      name: "cta",
      type: "group",
      label: "Call to Action",
      fields: [
        { name: "label", type: "text", label: "Button Text" },
        { name: "link", type: "text", label: "Button Link" },
      ],
    },
    {
      name: "stats",
      type: "array",
      label: "Statistics",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "backgroundType",
      type: "select",
      options: [
        { label: "Dark Blue", value: "darkblue" },
        { label: "Light", value: "light" },
      ],
      defaultValue: "darkblue",
    },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
