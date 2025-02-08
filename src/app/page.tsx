import { RadioButton } from "@/common/ui/radiobutton/radioButton";
import TabsComponent from "@/common/ui/tabs/tabs";

export default function HomePage() {
  const tabData = [
    { value: "tab1", trigger: "Вкладка 1", content: "Контент для вкладки 1" },
    { value: "tab2", trigger: "Вкладка 2", content: "Контент для вкладки 2" },
    { value: "tab3", trigger: "Вкладка 3", content: "Контент для вкладки 3" },
  ];
  return (<>
            <RadioButton options={[{value: '1', label: 'RadioButton' },
                                  { value: '2', label: 'RadioButton'}]
                                } />
            <TabsComponent tabs={tabData} />
          </>
  );
}
