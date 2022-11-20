import styles from "./style.module.scss";
import { PropsWithChildren } from "react";

export default function SectionContent({
  children,
  marketingpage,
}: PropsWithChildren<{}> | any) {
  return (
    <div
      className={`${styles.SectionContent} ${
        marketingpage ? `${styles.marketsection}` : ""
      }`}
    >
      {children}
    </div>
  );
}
