import { ReactNode } from "react";
import styles from "./style.module.scss";

interface ContentHeaderProps {
  title: string;
  start?: ReactNode;
  end?: ReactNode;
}

export default function ContentHeader({
  title,
  start,
  end,
}: ContentHeaderProps) {
  return (
    <div className={styles.ContentHeader}>
      {start}
      <div className={styles.Title}>{title}</div>
      {end}
    </div>
  );
}
