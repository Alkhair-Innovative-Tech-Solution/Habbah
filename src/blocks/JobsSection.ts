import type { Block } from "payload";
import { backgroundFields } from "@/fields/StyleFields";

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
    ...backgroundFields,
  ],
};
