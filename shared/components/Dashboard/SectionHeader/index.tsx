import styles from "./style.module.scss";
import Link from "next/link";
import Logo from "@/shared/assets/images/logo.svg";

interface SectionHeaderProps {
  title: string;
  description?: string;
  hideBackToSiteButton?: boolean;
}

export default function SectionHeader({
  title,
  description,
  hideBackToSiteButton = false,
}: SectionHeaderProps) {
  return (
    <div className={styles.SectionHeader}>
      <div className={styles.TitleContainer}>
        <p className={styles.Title}>{title}</p>
        {!hideBackToSiteButton && (
          <Link href="/">
            <a className={styles.BackToSiteButton}>
              بازگشت به سایت
              <Logo width={24} height={24} />
            </a>
          </Link>
        )}
      </div>
      {description && <p className={styles.Description}>{description}</p>}
    </div>
  );
}
