import styles from "./style.module.scss";
import { ReactNode } from "react";
import Link from "next/link";
import ArrowForwardIcon from "@/shared/assets/icons/arrowForward.svg";

interface MobileContentHeaderProps {
  backTo?: string;
  onBack?: () => {};
  start?: ReactNode;
  title: string;
  end?: ReactNode;
}

export default function MobileContentHeader({
  backTo,
  onBack,
  start,
  title,
  end,
}: MobileContentHeaderProps) {
  return (
    <div className={styles.MobileContentHeader}>
      {start}
      {backTo && (
        <Link href={backTo}>
          <a className={styles.BackButton} onClick={onBack}>
            <ArrowForwardIcon />
          </a>
        </Link>
      )}
      <div className={styles.Title}>{title}</div>
      {end}
    </div>
  );
}
