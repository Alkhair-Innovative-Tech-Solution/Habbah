import type { Field } from "payload";

export const backgroundFields: Field[] = [
  {
    type: "tabs",
    tabs: [
      {
        label: "Background",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "bgColorType",
                type: "select",
                label: "Background Type",
                options: [
                  { label: "None", value: "none" },
                  { label: "Solid Color", value: "solid" },
                  { label: "Gradient", value: "gradient" },
                  { label: "Image", value: "image" },
                ],
                defaultValue: "none",
                admin: { width: "50%" },
              },
              {
                name: "bgSolidColor",
                type: "text",
                label: "Background Color (Hex)",
                admin: { width: "50%", condition: (_, siblingData) => siblingData?.bgColorType === "solid" },
              },
            ],
          },
          {
            type: "row",
            fields: [
              {
                name: "bgGradientType",
                type: "select",
                label: "Gradient Direction",
                options: [
                  { label: "Top to Bottom", value: "to-b" },
                  { label: "Bottom to Top", value: "to-t" },
                  { label: "Left to Right", value: "to-r" },
                  { label: "Right to Left", value: "to-l" },
                  { label: "Top-Left to Bottom-Right", value: "to-br" },
                  { label: "Top-Right to Bottom-Left", value: "to-bl" },
                ],
                admin: { width: "50%", condition: (_, siblingData) => siblingData?.bgColorType === "gradient" },
              },
              {
                name: "bgGradientFrom",
                type: "text",
                label: "Gradient From Color (Hex)",
                admin: { width: "25%", condition: (_, siblingData) => siblingData?.bgColorType === "gradient" },
              },
              {
                name: "bgGradientTo",
                type: "text",
                label: "Gradient To Color (Hex)",
                admin: { width: "25%", condition: (_, siblingData) => siblingData?.bgColorType === "gradient" },
              },
            ],
          },
          {
            name: "bgImage",
            type: "upload",
            relationTo: "media",
            label: "Background Image",
            admin: { condition: (_, siblingData) => siblingData?.bgColorType === "image" },
          },
          {
            type: "row",
            fields: [
              {
                name: "bgImageOverlay",
                type: "text",
                label: "Overlay Color (Hex) - optional",
                admin: { width: "50%", condition: (_, siblingData) => siblingData?.bgColorType === "image" },
              },
              {
                name: "bgImageOverlayOpacity",
                type: "select",
                label: "Overlay Opacity",
                options: [
                  { label: "10%", value: "10" },
                  { label: "20%", value: "20" },
                  { label: "30%", value: "30" },
                  { label: "40%", value: "40" },
                  { label: "50%", value: "50" },
                  { label: "60%", value: "60" },
                  { label: "70%", value: "70" },
                  { label: "80%", value: "80" },
                  { label: "90%", value: "90" },
                ],
                defaultValue: "50",
                admin: { width: "50%", condition: (_, siblingData) => siblingData?.bgColorType === "image" },
              },
            ],
          },
        ],
      },
      {
        label: "Text & Colors",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "headingColor",
                type: "text",
                label: "Heading Color (Hex)",
                admin: { width: "33%" },
              },
              {
                name: "textColor",
                type: "text",
                label: "Text Color (Hex)",
                admin: { width: "33%" },
              },
              {
                name: "accentColor",
                type: "text",
                label: "Accent Color (Hex)",
                admin: { width: "33%" },
              },
            ],
          },
          {
            type: "row",
            fields: [
              {
                name: "badgeColor",
                type: "text",
                label: "Badge Color (Hex)",
                admin: { width: "33%" },
              },
              {
                name: "badgeBgColor",
                type: "text",
                label: "Badge Background (Hex)",
                admin: { width: "33%" },
              },
            ],
          },
        ],
      },
      {
        label: "Button",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "btnTextColor",
                type: "text",
                label: "Button Text Color (Hex)",
                admin: { width: "33%" },
              },
              {
                name: "btnBgColor",
                type: "text",
                label: "Button Background (Hex)",
                admin: { width: "33%" },
              },
              {
                name: "btnHoverBgColor",
                type: "text",
                label: "Button Hover BG (Hex)",
                admin: { width: "33%" },
              },
            ],
          },
        ],
      },
      {
        label: "Animation",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "animEnabled",
                type: "checkbox",
                label: "Enable Animation",
                defaultValue: true,
                admin: { width: "25%" },
              },
              {
                name: "animType",
                type: "select",
                label: "Animation Type",
                options: [
                  { label: "Fade In Up", value: "fadeUp" },
                  { label: "Fade In", value: "fadeIn" },
                  { label: "Fade In Left", value: "fadeLeft" },
                  { label: "Fade In Right", value: "fadeRight" },
                  { label: "Zoom In", value: "zoomIn" },
                  { label: "None", value: "none" },
                ],
                defaultValue: "fadeUp",
                admin: { width: "50%", condition: (_, siblingData) => siblingData?.animEnabled },
              },
              {
                name: "animDuration",
                type: "select",
                label: "Duration",
                options: [
                  { label: "0.3s", value: "0.3" },
                  { label: "0.5s", value: "0.5" },
                  { label: "0.8s", value: "0.8" },
                  { label: "1s", value: "1" },
                  { label: "1.5s", value: "1.5" },
                  { label: "2s", value: "2" },
                ],
                defaultValue: "0.8",
                admin: { width: "25%", condition: (_, siblingData) => siblingData?.animEnabled && siblingData?.animType !== "none" },
              },
            ],
          },
        ],
      },
      {
        label: "Cards",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "cardBgColor",
                type: "text",
                label: "Card Background Color (Hex)",
                admin: { width: "33%" },
              },
              {
                name: "cardTextColor",
                type: "text",
                label: "Card Text Color (Hex)",
                admin: { width: "33%" },
              },
              {
                name: "cardBorderColor",
                type: "text",
                label: "Card Border Color (Hex)",
                admin: { width: "33%" },
              },
            ],
          },
        ],
      },
      {
        label: "Spacing & Alignment",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "paddingTop",
                type: "select",
                label: "Padding Top",
                options: [
                  { label: "Default", value: "default" },
                  { label: "None (0px)", value: "none" },
                  { label: "Small (24px)", value: "small" },
                  { label: "Medium (48px)", value: "medium" },
                  { label: "Large (80px)", value: "large" },
                  { label: "Extra Large (128px)", value: "xlarge" },
                  { label: "Double Extra Large (192px)", value: "xxlarge" },
                ],
                defaultValue: "default",
                admin: { width: "50%" },
              },
              {
                name: "paddingBottom",
                type: "select",
                label: "Padding Bottom",
                options: [
                  { label: "Default", value: "default" },
                  { label: "None (0px)", value: "none" },
                  { label: "Small (24px)", value: "small" },
                  { label: "Medium (48px)", value: "medium" },
                  { label: "Large (80px)", value: "large" },
                  { label: "Extra Large (128px)", value: "xlarge" },
                  { label: "Double Extra Large (192px)", value: "xxlarge" },
                ],
                defaultValue: "default",
                admin: { width: "50%" },
              },
            ],
          },
          {
            type: "row",
            fields: [
              {
                name: "paddingTopCustom",
                type: "text",
                label: "Custom Padding Top (e.g., 20px or 5rem)",
                admin: { width: "50%" },
              },
              {
                name: "paddingBottomCustom",
                type: "text",
                label: "Custom Padding Bottom (e.g., 20px or 5rem)",
                admin: { width: "50%" },
              },
            ],
          },
          {
            type: "row",
            fields: [
              {
                name: "marginTop",
                type: "select",
                label: "Margin Top",
                options: [
                  { label: "None (0px)", value: "none" },
                  { label: "Small (16px)", value: "small" },
                  { label: "Medium (32px)", value: "medium" },
                  { label: "Large (64px)", value: "large" },
                  { label: "Extra Large (96px)", value: "xlarge" },
                ],
                defaultValue: "none",
                admin: { width: "50%" },
              },
              {
                name: "marginBottom",
                type: "select",
                label: "Margin Bottom",
                options: [
                  { label: "None (0px)", value: "none" },
                  { label: "Small (16px)", value: "small" },
                  { label: "Medium (32px)", value: "medium" },
                  { label: "Large (64px)", value: "large" },
                  { label: "Extra Large (96px)", value: "xlarge" },
                ],
                defaultValue: "none",
                admin: { width: "50%" },
              },
            ],
          },
          {
            type: "row",
            fields: [
              {
                name: "marginTopCustom",
                type: "text",
                label: "Custom Margin Top (e.g., 20px or 5rem)",
                admin: { width: "50%" },
              },
              {
                name: "marginBottomCustom",
                type: "text",
                label: "Custom Margin Bottom (e.g., 20px or 5rem)",
                admin: { width: "50%" },
              },
            ],
          },
          {
            name: "sectionAlignment",
            type: "select",
            label: "Section Content Alignment",
            options: [
              { label: "Default", value: "default" },
              { label: "Left Aligned", value: "left" },
              { label: "Centered", value: "center" },
              { label: "Right Aligned", value: "right" },
            ],
            defaultValue: "default",
          },
        ],
      },
    ],
  },
];
