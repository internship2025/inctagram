"use client";
import { Flex, Text } from "@radix-ui/themes";
import { Button } from "@/common/ui/button/button";
import { Input } from "@/common/ui/input/input";
import { SelectDemo } from "@/common/ui/selected/Select";
import { useState } from "react";
import { CustomDatePicker } from "@/common/ui/datePicker/DatePicker";
import { RadioButton } from "@/common/ui/radiobutton/radioButton";
import TabsComponent from "@/common/ui/tabs/tabs";

export default function HomePage() {
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  return (
    <Flex direction="column" gap="3" p="4">
      <Text size="5" weight="bold">
        Welcome to Radix UI with Next.js
      </Text>
      <Button variant={"primary"}>Click me4</Button>
      <Button variant={"secondary"}>Click me3</Button>
      <Button variant={"outline"}>Click me1</Button>
      <Button variant={"text"}>Click me2</Button>
      <Input />
      <Input />
      <Input />
      <SelectDemo
        className="marg"
        onValueChange={(val) => console.log(val)}
        disabled={false}
      />
      <CustomDatePicker
        isRange={true}
        selectedDate={dateRange}
        onDateChange={(range) => setDateRange(range as [Date, Date])}
      />

      <CustomDatePicker
        disabled={false}
        selectedDate={singleDate}
        onDateChange={(date) => setSingleDate(date as Date)}
      />
      <RadioButton options={[{value: '1', label: 'RadioButton' },
                            { value: '2', label: 'RadioButton'}]
                            }
      />
      
      <TabsComponent tabs={[
    { value: "tab1", trigger: "Вкладка 1", content: "Контент для вкладки 1" },
    { value: "tab2", trigger: "Вкладка 2", content: "Контент для вкладки 2" },
    { value: "tab3", trigger: "Вкладка 3", content: "Контент для вкладки 3" },
  ]} 
      />

    
    </Flex>
  );
}
