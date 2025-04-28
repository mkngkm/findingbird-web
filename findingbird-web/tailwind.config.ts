import type { Config } from "tailwindcss";
import headlessui from "@headlessui/tailwindcss";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0.2" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0.2", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.4s ease-out",
        "accordion-up": "accordion-up 0.4s ease-out",
        fadeIn: "fadeIn 0.4s ease-in-out forwards",
        slideUp: "slideUp 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        wooahMain: "#527FF7",
        wooahGreen: "#DCFCE7",
        wooahBlue: "#DBEAFE",
        wooahRed: "#FEE2E2",
        wooahYellow: "#F6FECA",
        wooahPurple: "#F3D3FF",
        wooahMint: "#CEF3FF",
        wooahDeepGreen: "#1DC25F",
        wooahDeepBlue: "#505BFF",
        wooahDeepRed: "#F87979",
        wooahDeepYellow: "#7D8B2F",
        wooahDeepPurple: "#AC38DD",
        wooahDeepMint: "#1892B0",
        wooahBrightPurple: "#6976ec",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "custom-inherit": ["inherit", { lineHeight: "inherit" }],
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
  plugins: [
    headlessui,
    forms,
    animate,
    scrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" }),
  ],
} satisfies Config;
