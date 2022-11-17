import styles from "./style.module.scss";
import { PropsWithChildren } from "react";

interface ButtonListProps {
  gap?: number;
}

export default function ButtonList({
  children,
  gap,
}: PropsWithChildren<ButtonListProps>) {
  return (
    <div className={styles.ButtonList} style={{ gap }}>
      {children}
    </div>
  );
}
