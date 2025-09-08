export type TabItem<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type CustomTabsProps<T = string> = {
  value: T;
  onChange: (value: T) => void;
  tabs: TabItem<T>[];
};
