import type { Block } from "payload";

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
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
