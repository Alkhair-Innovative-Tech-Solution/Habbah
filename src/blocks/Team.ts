import type { Block } from "payload";
import { backgroundFields } from "@/fields/StyleFields";

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
    ...backgroundFields,
  ],
};
