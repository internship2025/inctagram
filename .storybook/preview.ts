import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming'
import '../src/common/styles/index.scss'
import '../src/common/styles/colors.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
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
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#171717' },
        { name: 'gray', value: '#333333' },
      ],
    },

  },
};

export default preview;
