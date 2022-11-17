import styles from "./style.module.scss";
import { PropsWithChildren } from "react";

export default function SectionContent({ children }: PropsWithChildren<{}>) {
  return <div className={styles.SectionContent}>{children}</div>;
}
