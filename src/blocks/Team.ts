import type { Block } from "payload";

export const teamBlock: Block = {
  slug: "team",
  labels: { singular: "Team Section", plural: "Team Sections" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", label: "Heading" },
    {
      name: "members",
      type: "array",
      required: true,
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", label: "Role / Title" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
