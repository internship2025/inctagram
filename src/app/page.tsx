import { RadioButton } from "@/common/ui/radiobutton/radioButton";
import TabsComponent from "@/common/ui/tabs/tabs";

export default function HomePage() {
  
const tabsData = [
  {
    value: "tab1",
    trigger: "Tab 1",
    content: <p>This is the content for Tab 1.</p>,
  },
  {
    value: "tab2",
    trigger: "Tab 2",
    content: <p>This is the content for Tab 2.</p>,
  },
  {
    value: "tab3",
    trigger: "Tab 3",
    content: <p>This is the content for Tab 3.</p>,
    // disabled: true,
  },
];
const radioOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

return (
  <div>
      <RadioButton options={radioOptions} />
      <RadioButton options={radioOptions} disabled={true} />    
      <TabsComponent variant={'primary'} tabs={tabsData}  />
  </div>
);
}
