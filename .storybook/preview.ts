import type { Preview } from "@storybook/react";
import "../src/app/styles/colors.css";
import "../src/app/styles/boilerplate.css";
import "../src/app/styles/typography.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
