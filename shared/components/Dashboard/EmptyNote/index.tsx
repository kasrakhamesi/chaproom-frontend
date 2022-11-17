import styles from "./style.module.scss";
import { PropsWithChildren } from "react";

export default function EmptyNote({ children }: PropsWithChildren<{}>) {
  return <div className={styles.EmptyNote}>{children}</div>;
}
