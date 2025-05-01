import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof meta>;

const DatePickerComponent = () => {
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  return (
    <DatePicker
      selectedDate={singleDate}
      onDateChange={(date) => setSingleDate(date as Date)}
    />
  );
};

export const DatePickerStory: Story = {
  args: {},
  render: () => <DatePickerComponent />,
};

const DatePickerDisabledComponent = ({ disabled }: { disabled?: boolean }) => {
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  return (
    <DatePicker
      disabled={disabled}
      selectedDate={singleDate}
      onDateChange={(date) => setSingleDate(date as Date)}
    />
  );
};

export const DatePickerDisabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <DatePickerDisabledComponent {...args} />,
};

const DatePickerRangeComponent = ({ isRange }: { isRange?: boolean }) => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  return (
    <DatePicker
      isRange={isRange}
      selectedDate={dateRange}
      onDateChange={(range) => setDateRange(range as [Date, Date])}
    />
  );
};

export const DatePickerRange: Story = {
  args: {
    isRange: true,
  },
  render: (args) => <DatePickerRangeComponent {...args} />,
};

const DatePickerRangeDisabledComponent = ({
  isRange,
  disabled,
}: {
  isRange?: boolean;
  disabled?: boolean;
}) => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>([
    new Date(),
    new Date(),
  ]);
  return (
    <DatePicker
      disabled={disabled}
      isRange={isRange}
      selectedDate={dateRange}
      onDateChange={(range) => setDateRange(range as [Date, Date])}
    />
  );
};

export const DatePickerRangeDisabled: Story = {
  args: {
    isRange: true,
    disabled: true,
  },
  render: (args) => <DatePickerRangeDisabledComponent {...args} />,
};
