import type { Block } from "payload";

export const mapSectionBlock: Block = {
  slug: "map-section",
  labels: { singular: "Map Section", plural: "Map Sections" },
  fields: [
    { name: "title", type: "text", label: "Heading" },
    { name: "address", type: "text", label: "Address" },
    { name: "embedUrl", type: "text", label: "Google Maps Embed URL" },
    {
      name: "contacts",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "value", type: "text" },
      ],
    },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
