import type { Block } from "payload";
import { backgroundFields } from "@/fields/StyleFields";

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
        { label: "Right Aligned", value: "right" },
        { label: "Text Left, Image Right", value: "text-left-image-right" },
        { label: "Text Right, Image Left", value: "text-right-image-left" },
        { label: "Image Top", value: "image-top" },
        { label: "Image Bottom", value: "image-bottom" },
      ],
      defaultValue: "centered",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Section Image",
      admin: {
        condition: (_, siblingData) => 
          ["text-left-image-right", "text-right-image-left", "image-top", "image-bottom"].includes(siblingData?.layout),
      },
    },
    {
      name: "imageStyle",
      type: "group",
      label: "Image Style",
      admin: {
        condition: (_, siblingData) => 
          ["text-left-image-right", "text-right-image-left", "image-top", "image-bottom"].includes(siblingData?.layout),
      },
      fields: [
        {
          name: "borderRadius",
          type: "select",
          label: "Border Radius",
          options: [
            { label: "None", value: "rounded-none" },
            { label: "Small", value: "rounded-lg" },
            { label: "Medium", value: "rounded-2xl" },
            { label: "Large", value: "rounded-[3rem]" },
            { label: "Full / Circle", value: "rounded-full" },
          ],
          defaultValue: "rounded-2xl",
        },
        {
          name: "shadow",
          type: "select",
          label: "Shadow Effect",
          options: [
            { label: "None", value: "shadow-none" },
            { label: "Small", value: "shadow-md" },
            { label: "Large", value: "shadow-2xl" },
            { label: "Soft Glow", value: "shadow-[0_20px_50px_rgba(0,191,230,0.15)]" },
            { label: "Yellow Glow", value: "shadow-[0_20px_50px_rgba(255,195,0,0.2)]" },
          ],
          defaultValue: "shadow-2xl",
        },
        {
          name: "aspectRatio",
          type: "select",
          label: "Aspect Ratio",
          options: [
            { label: "Square (1:1)", value: "aspect-square" },
            { label: "Video (16:9)", value: "aspect-video" },
            { label: "Standard (4:3)", value: "aspect-4/3" },
            { label: "Portrait (3:4)", value: "aspect-3/4" },
            { label: "Auto", value: "aspect-auto" },
          ],
          defaultValue: "aspect-auto",
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      label: "Call to Action (Optional)",
      fields: [
        { name: "label", type: "text", label: "Button Text" },
        { name: "link", type: "text", label: "Button Link" },
      ],
    },
    ...backgroundFields,
  ],
};
