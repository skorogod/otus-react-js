import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
    "@storybook/preset-scss",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "@storybook-react-i18next"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};
export default config;
