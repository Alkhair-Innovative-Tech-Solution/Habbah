import type { Block } from "payload";

export const textBlock: Block = {
  slug: "text",
  labels: { singular: "Text Section", plural: "Text Sections" },
  fields: [
    { name: "badge", type: "text", label: "Badge Text" },
    { name: "title", type: "text", label: "Heading" },
    { name: "content", type: "richText", label: "Content", required: true },
    {
      name: "layout",
      type: "select",
      options: [
        { label: "Centered", value: "centered" },
        { label: "Left Aligned", value: "left" },
      ],
      defaultValue: "centered",
    },
    { name: "background", type: "select", options: [{ label: "None", value: "none" }, { label: "Light Blue", value: "lightblue" }], defaultValue: "none" },
    { name: "textColor", type: "text", label: "Text Color Override (Hex)" },
    { name: "backgroundColor", type: "text", label: "Background Color Override (Hex)" },
    { name: "backgroundImage", type: "text", label: "Background Image URL" },
  ],
};
