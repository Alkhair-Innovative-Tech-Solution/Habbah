import type { Block } from "payload";
import { backgroundFields } from "@/fields/StyleFields";

export const contactFormBlock: Block = {
  slug: "contact-form",
  labels: { singular: "Contact Form", plural: "Contact Forms" },
  fields: [
    { name: "title", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "fields",
      type: "array",
      required: true,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "name", type: "text", required: true },
        { name: "type", type: "select", options: [{ label: "Text", value: "text" }, { label: "Email", value: "email" }, { label: "Textarea", value: "textarea" }, { label: "Tel", value: "tel" }], required: true },
        { name: "required", type: "checkbox" },
        { name: "placeholder", type: "text" },
      ],
    },
    {
      name: "submitLabel",
      type: "text",
      defaultValue: "Send Message",
    },
    ...backgroundFields,
  ],
};
