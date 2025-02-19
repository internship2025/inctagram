import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CustomDatePicker } from "./DatePicker";

const meta: Meta<typeof CustomDatePicker> = {
  component: CustomDatePicker,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DatePicker: Story = {
  args: {},
  render: () => {
    const [singleDate, setSingleDate] = useState<Date | null>(new Date());

    return (
      <CustomDatePicker
        selectedDate={singleDate}
        onDateChange={(date) => setSingleDate(date as Date)}
      />
    );
  },
};

export const DatePickerDisabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ disabled }) => {
    const [singleDate, setSingleDate] = useState<Date | null>(new Date());

    return (
      <CustomDatePicker
        disabled={disabled}
        selectedDate={singleDate}
        onDateChange={(date) => setSingleDate(date as Date)}
      />
    );
  },
};

export const DatePickerRange: Story = {
  args: {
    isRange: true,
  },
  render: ({ isRange }) => {
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

    return (
      <CustomDatePicker
        isRange={isRange}
        selectedDate={dateRange}
        onDateChange={(range) => setDateRange(range as [Date, Date])}
      />
    );
  },
};

export const DatePickerRangeDisabled: Story = {
  args: {
    isRange: true,
    disabled: true,
  },
  render: ({ isRange, disabled }) => {
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

    return (
      <CustomDatePicker
        disabled={disabled}
        isRange={isRange}
        selectedDate={[new Date(), new Date()]}
        onDateChange={(range) => setDateRange(range as [Date, Date])}
      />
    );
  },
};
