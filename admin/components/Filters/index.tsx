import { ReactNode } from "react";
import styles from "./style.module.scss";

interface FiltersProps {
  removeFilters: () => void;
  rows: ReactNode[][];
}

export default function Filters({ removeFilters, rows }: FiltersProps) {
  return (
    <div className={styles.Filters}>
      <div className={styles.Rows}>
        {rows.map((row, index) => (
          <div key={index}>
            {row.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        ))}
      </div>
      <button
        className={styles.RemoveFiltersButton}
        onClick={() => removeFilters()}
      >
        حذف فیلترها
      </button>
    </div>
  );
}
