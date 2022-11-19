import styles from "./style.module.scss";
import { ReactNode } from "react";

interface ControlsProps {
  start?: ReactNode;
  end?: ReactNode;
}

export default function Controls({ start, end }: ControlsProps) {
  return (
    <div className={styles.Controls}>
      <div className={styles.Start}>{start}</div>
      <div className={styles.End}>{end}</div>
    </div>
  );
}
