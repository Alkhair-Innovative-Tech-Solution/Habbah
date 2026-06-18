import type { Block } from "payload";
import { backgroundFields } from "@/fields/StyleFields";

export const timelineBlock: Block = {
  slug: "timeline",
  labels: { singular: "Timeline", plural: "Timelines" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", label: "Heading" },
    {
      name: "steps",
      type: "array",
      required: true,
      fields: [
        { name: "stepNumber", type: "text", label: "Step Number", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "icon", type: "text", label: "Icon Name (lucide-react)" },
      ],
    },
    ...backgroundFields,
  ],
};
