import type { Meta, StoryObj } from "@storybook/react";
import { SwapFlowStory } from "./SwapFlowStory.js";

const meta = {
  title: "Pay/Flows/Confirm Swap Flow (New)",
  component: SwapFlowStory,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SwapFlowStory>;

type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {
    theme: "dark",
  },
};

export const Light: Story = {
  args: {
    theme: "light",
  },
};

export default meta;
