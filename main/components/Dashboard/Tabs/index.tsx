import styles from "./style.module.scss";

interface TabsProps {
  currentTabId: any;
  setCurrentTabId: (newValue: any) => void;
  tabs: {
    id: any;
    label: string;
  }[];
}

export default function Tabs({
  currentTabId,
  setCurrentTabId,
  tabs,
}: TabsProps) {
  return (
    <div className={styles.Tabs}>
      {tabs.map((tab) => (
        <button
          className={tab.id === currentTabId ? styles.Current : undefined}
          onClick={() => setCurrentTabId(tab.id)}
          key={tab.id}
          disabled={tab.id === currentTabId}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
