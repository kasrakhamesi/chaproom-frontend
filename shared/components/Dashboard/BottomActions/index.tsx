import styles from "./style.module.scss";
import { PropsWithChildren, ReactNode } from "react";
import ButtonList from "@/shared/components/ButtonList";

interface BottomActionsProps {
  start?: ReactNode;
}

export default function BottomActions({
  start,
  children,
}: PropsWithChildren<BottomActionsProps>) {
  return (
    <div className={styles.BottomActions}>
      <div className={styles.Start}>{start}</div>
      <ButtonList>{children}</ButtonList>
    </div>
  );
}
