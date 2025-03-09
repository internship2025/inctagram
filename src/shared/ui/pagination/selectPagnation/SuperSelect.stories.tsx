import { Meta, StoryObj } from "@storybook/react";
import { SuperSelect } from "./SuperSelect";

// Метаданные для Storybook
const meta = {
  title: "Components/SuperSelect",
  component: SuperSelect,
  parameters: {
    tags: ["autodocs"],
  },
} satisfies Meta<typeof SuperSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "option1",
    onChangeAction: (value) => console.log("Выбрано:", value),
    options: [
      { value: "option1", label: "Опция 1" },
      { value: "option2", label: "Опция 2" },
      { value: "option3", label: "Опция 3" },
    ],
  },
};

export const WithDifferentValue: Story = {
  args: {
    value: "option2", // Другое значение по умолчанию
    onChangeAction: (value) => console.log("Выбрано:", value),
    options: [
      { value: "option1", label: "Опция 1" },
      { value: "option2", label: "Опция 2" },
      { value: "option3", label: "Опция 3" },
    ], // Массив опций
  },
};

export const WithManyOptions: Story = {
  args: {
    value: "option5", // Значение по умолчанию
    onChangeAction: (value) => console.log("Выбрано:", value),
    options: [
      { value: "option1", label: "Опция 1" },
      { value: "option2", label: "Опция 2" },
      { value: "option3", label: "Опция 3" },
      { value: "option4", label: "Опция 4" },
      { value: "option5", label: "Опция 5" },
      { value: "option6", label: "Опция 6" },
    ], // Больше опций
  },
};

export const WithoutValue: Story = {
  args: {
    value: "",
    onChangeAction: (value) => console.log("Выбрано:", value),
    options: [
      { value: "option1", label: "Опция 1" },
      { value: "option2", label: "Опция 2" },
      { value: "option3", label: "Опция 3" },
    ],
  },
};
