import type { Block } from "payload";

export const ctaBlock: Block = {
  slug: "cta",
  labels: { singular: "Call to Action", plural: "Call to Actions" },
  fields: [
    { name: "title", type: "text", required: true, label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "button",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "link", type: "text" },
      ],
    },
    {
      name: "backgroundType",
      type: "select",
      options: [
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
      ],
      defaultValue: "dark",
    },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
