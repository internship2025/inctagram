import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "../src/app/styles/colors.css";
import "../src/app/styles/boilerplate.css";
import "../src/app/styles/typography.css";

const preview: Preview = {
  parameters: {
    actions: {
      handles: ["^on[A-Z].*"],
    },

    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#171717" },
        { name: "gray", value: "#333333" },
      ],
    },
  },
};

export default preview;
