import type { Block } from "payload";
import { backgroundFields } from "@/fields/StyleFields";

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
    ...backgroundFields,
  ],
};
