import type { Preview } from "@storybook/react";
import i18n from '../src/i18n';


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
