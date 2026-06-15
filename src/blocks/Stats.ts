import type { Block } from "payload";

export const statsBlock: Block = {
  slug: "stats",
  labels: { singular: "Statistics", plural: "Statistics" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", label: "Heading" },
    {
      name: "stats",
      type: "array",
      required: true,
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "layout",
      type: "select",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Row", value: "row" },
      ],
      defaultValue: "grid",
    },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
