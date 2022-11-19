import { ReactNode } from "react";
import styles from "./style.module.scss";

interface SwitchButtonsProps {
  nullable?: boolean;
  options: { id: any; label: ReactNode }[];
  value: any;
  onChange: (newValue: any) => void;
}

export default function SwitchButtons({
  nullable,
  options,
  value,
  onChange,
}: SwitchButtonsProps) {
  return (
    <div className={styles.SwitchButtons} data-nullable={nullable}>
      {options.map((option) => (
        <button
          key={option.id}
          data-current={value === option.id}
          onClick={() => {
            if (value === option.id) {
              if (nullable) {
                onChange(null);
              }
              return;
            }

            onChange(option.id);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
