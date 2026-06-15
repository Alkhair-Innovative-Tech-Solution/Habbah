import type { Block } from "payload";

export const testimonialsBlock: Block = {
  slug: "testimonials",
  labels: { singular: "Testimonials", plural: "Testimonials" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "testimonials",
      type: "array",
      required: true,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", label: "Role / Designation" },
        { name: "quote", type: "textarea", required: true },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
    { name: "cardBgColor", type: "text", label: "Card Background Color (Hex)" },
    { name: "cardTextColor", type: "text", label: "Card Text Color (Hex)" },
  ],
};
