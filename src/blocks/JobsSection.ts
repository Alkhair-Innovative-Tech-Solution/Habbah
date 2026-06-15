import type { Block } from "payload";

export const jobsSectionBlock: Block = {
  slug: "jobs-section",
  labels: { singular: "Jobs Section", plural: "Jobs Sections" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "emptyMessage",
      type: "text",
      label: "Message when no jobs available",
      defaultValue: "No open positions at this time.",
    },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
