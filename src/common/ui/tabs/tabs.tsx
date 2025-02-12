import * as Tabs from "@radix-ui/react-tabs";
import classNames from "classnames"; // Для удобной работы с классами
import styles from "./tabsButton.module.css";

type TabProps = {
  variant?: "primary" | "secondary";
  tabs: {
    value: string;
    trigger: string;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
};

const TabsComponent = ({ variant = "primary", tabs }: TabProps) => {
  return (
    <Tabs.Root
      defaultValue={tabs.find((t) => !t.disabled)?.value}
      className={classNames(styles.root, styles[variant])}
    >
      <Tabs.List className={classNames(styles.list, styles[`${variant}List`])}>
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={classNames(styles.trigger, styles[`${variant}Trigger`])}
            disabled={tab.disabled}
          >
            {tab.trigger}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.value}
          value={tab.value}
          className={styles.content}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TabsComponent;
