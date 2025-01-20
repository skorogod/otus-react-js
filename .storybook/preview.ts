import React from "react";
import type { Preview, StoryObj } from "@storybook/react";
import {ThemeProvider} from '../src/features/themeProvider/ThemeProvider'
import { DecoratorFn } from "@storybook/react";


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
