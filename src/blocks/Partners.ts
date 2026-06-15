import type { Block } from "payload";

export const partnersBlock: Block = {
  slug: "partners",
  labels: { singular: "Partners", plural: "Partners" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", label: "Heading" },
    {
      name: "partners",
      type: "array",
      required: true,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "logo", type: "upload", relationTo: "media" },
        { name: "website", type: "text" },
      ],
    },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
