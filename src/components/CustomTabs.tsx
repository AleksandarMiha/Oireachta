import { Tab, Tabs } from "@mui/material";

export type TabItem<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type CustomTabsProps<T = string> = {
  value: T;
  onChange: (value: T) => void;
  tabs: TabItem<T>[];
};

export function CustomTabs<T = string>({
  value,
  onChange,
  tabs,
}: CustomTabsProps<T>) {
  return (
    <Tabs value={value} onChange={(_, newValue) => onChange(newValue as T)}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value as string}
          value={tab.value}
          label={tab.label}
          disabled={tab.disabled}
        />
      ))}
    </Tabs>
  );
}
