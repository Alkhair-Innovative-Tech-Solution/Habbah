import type { Block } from "payload";
import { backgroundFields } from "@/fields/StyleFields";

export const cardsGridBlock: Block = {
  slug: "cards-grid",
  labels: { singular: "Cards Grid", plural: "Cards Grids" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "cards",
      type: "array",
      required: true,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "icon", type: "text", label: "Icon Name (lucide-react)" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "link", type: "text", label: "Link URL" },
      ],
    },
    {
      name: "columns",
      type: "select",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
      defaultValue: "3",
    },
    ...backgroundFields,
  ],
};
