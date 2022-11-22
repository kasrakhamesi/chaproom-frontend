import styles from "./style.module.scss";
import Link from "next/link";
import Logo from "@/shared/assets/images/logo.svg";

interface SectionHeaderProps {
  title: string;
  description?: string;
  isAdmin?: boolean;
}

export default function SectionHeader({
  title,
  description,
  isAdmin = false,
}: SectionHeaderProps) {
  return (
    <div className={styles.SectionHeader}>
      <div className={styles.TitleContainer}>
        <p className={styles.Title}>{title}</p>
        {!isAdmin ? (
          <Link href="/">
            <a className={styles.BackToSiteButton}>
              بازگشت به سایت
              <Logo width={24} height={24} />
            </a>
          </Link>
        ) : (
          <a
            className={styles.BackToSiteButton}
            href={process.env.MAIN_URL}
            target="_blank"
          >
            بازگشت به سایت
            <Logo width={24} height={24} />
          </a>
        )}
      </div>
      {description && <p className={styles.Description}>{description}</p>}
    </div>
  );
}
