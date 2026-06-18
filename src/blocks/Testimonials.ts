import type { Block } from "payload";
import { backgroundFields } from "@/fields/StyleFields";

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
    ...backgroundFields,
  ],
};
