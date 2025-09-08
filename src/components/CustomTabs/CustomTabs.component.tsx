import { Tab, Tabs } from "@mui/material";
import type { CustomTabsProps } from "./CustomTabs.types";

export function CustomTabs<T = string>({
  value,
  onChange,
  tabs,
}: CustomTabsProps<T>) {
  return (
    <Tabs value={value} onChange={(_, newValue) => onChange(newValue as T)}>
      {tabs.map(({ value, label, disabled }) => (
        <Tab
          key={value as string}
          value={value}
          label={label}
          disabled={disabled}
        />
      ))}
    </Tabs>
  );
}
